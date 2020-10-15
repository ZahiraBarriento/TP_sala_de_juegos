import { Component, OnInit } from '@angular/core';
import { ArithmeticAgility } from '../../../classes/arithmetic-agility';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  playGame: ArithmeticAgility;
  check: boolean = true;
  enter: any;
  count: any;
  time: number = 30;
  display : boolean = false;
  game : boolean = false;

  constructor() {
    this.playGame = new ArithmeticAgility();
  }

  ngOnInit(): void {
  }

  play() {
    this.check = false;
    this.enter = null;
    this.display = false;
    this.playGame.count = 1;
    this.game = true;

    this.playGame.game();
    this.count = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.count);
        this.gameOver();
        this.check = true;
        this.time = 30;
      }
    }, 900);
  }

  checkNum(){
    if (this.playGame.count < 5)
    {
      this.playGame.checkGame();
      this.playGame.numEnter = null;
      this.playGame.game();
      console.log(this.playGame.count)
    }
    else
    {
      console.log(this.playGame.count)
      this.playGame.checkGame();
      this.game = false
      clearInterval(this.count);
      this.gameOver();
      this.check = true;
      this.time = 30;
      
    }
  }

  gameOver() {
    this.playGame.numEnter = null;
    this.playGame.num1 = null;
    this.playGame.num2 = null;
    this.playGame.operator = null;
    this.display = true;
  }

}
