import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    public router: Router) { }
  //#endregion

  //#region Validaciones
  loginForm = this.formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
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
      this.router.navigateByUrl('/home');
    }).catch(error => console.log(error))
  }
  //#endregion

}
