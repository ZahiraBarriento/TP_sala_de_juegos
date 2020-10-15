import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RockPaperScissors } from '../../../classes/rock-paper-scissors';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  playGame : RockPaperScissors
  result: string;
  pointsUser = 0;
  pointsComp =  0;

  constructor() { 
    this.playGame = new RockPaperScissors();
  }

  ngOnInit(): void {
  }

  //OBTENGO LO SELECCIONADO POR EL USUARIO
  play(choice: string): void {
    //SE LO PASO A LA FUNCION QUE JUGARA CON LA COMPUTADORA
    const result = this.playGame.game(choice)
    this.result = result.message;
    this.pointsComp += result.compAdd;
    this.pointsUser += result.userAdd;
    console.log(result)
  }

}
