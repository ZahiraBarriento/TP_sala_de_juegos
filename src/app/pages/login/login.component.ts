import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users : any;

  ngOnInit(): void {
  }

  //#region Get
  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get('password')
  }
  //#endregion

  //#region Constructor
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private firesbase : FirebaseService) { 
      this.traerUsuarios();
    }
  //#endregion

  //#region Validaciones
  loginForm = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  });
  //#endregion

  //#region Submit
  onSubmitLogin() {
    this.authService.login(this.email.value, this.password.value).then(res => {

      this.users.forEach(element => {
        if(element.email == this.email.value){
          localStorage.setItem('userCurrent', JSON.stringify(element));
          this.router.navigateByUrl('/home');
        }
      });
      
    }).catch(error => console.log(error))
  }
  //#endregion

  traerUsuarios(){
    this.firesbase.getDataQuery('users').subscribe(element =>{
      this.users = element;
    })
  }

  public errorMessages ={
    email: [
      {type: 'required', message: 'Ingrese correo eletrónico'},
      {type: 'pattern', message: 'Ingrese un correo electónico valido'}
    ],
    password:[
      {type: 'required', message: 'Ingrese contraseña'},
      {type: 'minlength', message: 'Contraseña debe contener almenos 8 caracteres'}
    ]
  }
}
