import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../../models/user';

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
    public router: Router) { }
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
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]]
  });
  //#endregion

  //#region Submit
  onSubmitRegister() {
    this.authService.register(this.name.value, this.lastName.value ,this.email.value, this.password.value).then(res => {
      console.log(this.authService.getUserAuth())
      this.router.navigateByUrl('/home');
    }).catch(error => console.log(error))
  }
  //#endregion

}
