import { utf8Encode } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
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
  user : any;
  partida : any;
  gano : number = 0;
  perdio : number = 0;
  jugadas : number = 0;

  constructor(private firebase : FirebaseService) { 
    this.buttons = [];
    this.playGame = new Hangman();
    this.initializeButton();
    this.wordSecret = this.playGame.getWordChoice();

    this.user = JSON.parse(localStorage.getItem('userCurrent'));
    this.obtenerPartida();
  }

  ngOnInit(): void {
    console.log(this.playGame.guion)
    this.playGame.countError = 0;
  }

  play(button){
    this.result = this.playGame.game(button)

    if(this.playGame.countError == 6){
      this.resetGame();
      this.gano = this.partida.gano;
      this.perdio = this.partida.perdio + 1;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.user.uid, {ahorcado : {perdio : this.perdio ,gano : this.gano, jugadas : this.jugadas}});
    }else if(this.result){
      this.resetGame();
      this.gano = this.partida.gano + 1;
      this.perdio = this.partida.perdio;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.user.uid, {ahorcado : {perdio : this.perdio ,gano : this.gano, jugadas : this.jugadas}});
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

  obtenerPartida(){
    var partidas : any;
    this.firebase.getDataQuery('games').subscribe(element =>{
      partidas = element;
      partidas.forEach(element => {
        console.log(element.id)
        if(element.id == this.user.uid){
          this.partida = element.ahorcado;
          console.log(this.partida)
        }
      });
    })
  }
}
