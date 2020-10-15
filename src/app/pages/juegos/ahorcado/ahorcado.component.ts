import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Hangman } from '../../../classes/hangman';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  playGame : Hangman;
  readonly alphabet = [
    "A", "B", "C", "D", "E", "F", "G", 
    "H", "I", "J", "H", "L", "M", "N", 
    "Ñ", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"];
  wordSecret : string;
  buttons : Array<{letter: string, state : string}>;
  result: any;

  constructor() { 
    this.buttons = [];
    this.playGame = new Hangman();
    this.initializeButton();
    this.wordSecret = this.playGame.getWordChoice();
  }

  ngOnInit(): void {
    console.log(this.playGame.guion)
    this.playGame.countError = 0;
  }

  play(button){
    this.result = this.playGame.game(button)

    if(this.playGame.countError == 6){
      this.resetGame();
    }else if(this.result){
      this.resetGame();
    }
  }

  resetGame(){
    setTimeout(() =>{
      window.location.reload();
    }, 2000);
  }

  initializeButton(){
    for (let index = 0; index < this.alphabet.length; index++) {
      this.buttons.push({letter: this.alphabet[index], state: "button-not"});
    }
  }
}
