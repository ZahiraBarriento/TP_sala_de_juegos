import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {
  }

  //#region Get
  get name() {
    return this.registerForm.get("name");
  }

  get lastName() {
    return this.registerForm.get('lastName')
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get('password')
  }
  //#endregion

  //#region Constructor
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private firebase : FirebaseService) { }
  //#endregion

  //#region Validaciones
  registerForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"),
      Validators.minLength(3)
    ]],
    lastName:['', [
      Validators.required,
      Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"),
      Validators.minLength(3)
    ]],
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
  onSubmitRegister() {
    
    this.authService.register(this.name.value, this.lastName.value ,this.email.value, this.password.value).then((res : any) => {

      var json = {
        adivina : {
          gano : 0,
          perdio : 0,
          jugadas : 0
        },
        agilidad : {
          gano : 0,
          perdio : 0,
          jugadas : 0
        },
        ahorcado : {
          gano : 0,
          perdio : 0,
          jugadas : 0
        },
        anagrama : {
          gano : 0,
          perdio : 0,
          jugadas : 0
        },
        ppt : {
          gano : 0,
          perdio : 0,
          empate : 0,
          jugadas : 0
        },
        tateti : {
          gano : 0,
          perdio : 0,
          empate : 0,
          jugadas : 0
        }
      };

      this.router.navigateByUrl('/login');
      this.firebase.addData('games', res.user.uid, json);
    }).catch(error => console.log(error))
  }
  //#endregion

  public errorMessages ={
    email: [
      {type: 'required', message: 'Ingrese correo eletrónico'},
      {type: 'pattern', message: 'Ingrese un correo electónico valido'}
    ],
    password:[
      {type: 'required', message: 'Ingrese contraseña'},
      {type: 'minlength', message: 'Contraseña debe contener almenos 8 caracteres'}
    ],
    name:[
      {type: 'required', message: 'Ingrese nombre'},
      {type: 'minlength', message: 'El nombre debe contener almenos 3 caracteres'}
    ],
    lastName:[
      {type: 'required', message: 'Ingrese apellido'},
      {type: 'minlength', message: 'El apellido debe contener almenos 3 caracteres'}
    ]
  }

}
