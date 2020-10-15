import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Anagram } from '../../../classes/anagram';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  playGame : Anagram;
  wordDes : string;
  word : string;
  resultado : string;
  time : number = 15;
  count : any;
  timeSpent : number;
  show : boolean = true;
  game : boolean = false;
  lose : boolean = false;
  
  constructor() 
  {
    this.playGame = new Anagram();
  }
  
  ngOnInit() {
  }

  generateWord()
  {
    this.time = 15;
    this.show = false;
    this.game = true;
    this.word = "";
    this.lose = false;
    this.wordDes = this.playGame.generateWord();
    this.count = setInterval(() => {
      this.time--;
      if (this.time == 0) {
        clearInterval(this.count);
        this.gameOver();
      }
    }, 900);
  }

  play()
  {
    if(this.word == "" || this.word == null)
    {
      this.resultado = "Vacío";
    }
    else
    {
      this.playGame.game(this.word);
      this.resultado = this.playGame.checkGame();
      
      if (this.resultado == "Ganó")
      {
        this.timeSpent = this.time;
        clearInterval(this.count);
        this.time = 0;
        this.lose = true;
      }
    }
  }

  back()
  {
    clearInterval(this.count);
    this.time = 0;
    this.game = false;
    this.show = true;
    this.resultado = "";
  }

  reset(){
    clearInterval(this.count);
    this.time = 15;
    this.resultado = "";
    this.lose = false;
    this.generateWord();
  }

  gameOver(){
    this.lose = true;
    this.resultado = "Fin"
    this.time = 0;
    console.log('entro')
  }
}
