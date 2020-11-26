import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit {

  user : boolean = false;

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserAuth().subscribe(user =>{
      if(user != null){
        this.user = true;
      }
    })
  }

  game(gamePlay){
    if(this.user){
      switch(gamePlay){
        case 'adivina':
          this.router.navigate(['juegos/anagrama']);
          break;
        case 'ppt':
          this.router.navigate(['juegos/piedra-papel-tijera']);
          break;
        case 'agilidad':
          this.router.navigate(['juegos/agilidad-aritmetica']);
          break;
        case 'adivina-numero':
          this.router.navigate(['juegos/adivina-numero']);
          break;
        case 'tateti':
          this.router.navigate(['juegos/tateti']);
          break;
        case 'ahorcado':
          this.router.navigate(['juegos/ahorcado']);
          break;
      }
    }
  }

}
