import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  login : boolean = false;

  constructor(private AFauth : AngularFireAuth){

  }

  ngOnInit(): void {
    
  }


  
  title = 'TP-Angular';
}
