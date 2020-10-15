import { Component, OnInit } from '@angular/core';
import { GuessNumber } from '../../../classes/guess-number';

@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.css']
})
export class AdivinaNumeroComponent implements OnInit {

  playGame : GuessNumber;
  contador : number = 0;
  number : number;
  result : string;

  constructor() { 
    this.playGame = new GuessNumber();
  }

  ngOnInit(): void {
  }

  play(){
    this.contador++;
    const result = this.playGame.game(this.number)
    console.log(result)

    if(result){
      this.result ='Adivinaste!';
    }

    console.log(this.contador)
    switch(this.contador){
      case 1:
        if(!result)
        {
          this.result = "No, vuelve a intentar";
        }
        break;
      case 2:
          if(!result)
          {
            this.result ="Dicen que la tercera es la vencida";
          }
        break;
      case 3:
          if(!result)
          {
            this.result ="No era como decian, ¡Intenta una vez mas!";
          }
        break;
      case 4:
          if(!result)
          {
            this.result = "¡Perdiste! El número era el: " + this.playGame.numSecret;
          }
        break;
    }
  }
}
