import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Anagram } from '../../../classes/anagram';
import { AlertService } from '../../../services/alert.service';

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
  user : any;
  partida : any;
  gano : number = 0;
  perdio : number = 0;
  jugadas : number = 0;

  constructor(private firebase : FirebaseService, private alert : AlertService) 
  {
    this.playGame = new Anagram();
  }
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userCurrent'));
    console.log(this.user)
    this.obtenerPartida();
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
        this.alert.presentAlertSuccess('GANASTE', 'Has descubierto la palabra', 'OK');
        this.timeSpent = this.time;
        clearInterval(this.count);
        this.time = 0;
        this.lose = true;
        this.gano = this.partida.gano + 1;
        this.perdio = this.partida.perdio;
        this.jugadas =  this.partida.jugadas + 1;
        this.firebase.updateData('games', this.user.uid, {anagrama : {perdio : this.perdio ,gano : this.gano, jugadas : this.jugadas}});

      } else if (this.resultado == "Perdió"){
        this.alert.presentAlertError('PERDISTE', 'La palabra era ' + this.playGame.wordOrd, 'OK');
        this.gano = this.partida.gano;
        this.perdio = this.partida.perdio + 1;
        this.jugadas =  this.partida.jugadas + 1;
        this.firebase.updateData('games', this.user.uid, {anagrama : {perdio : this.perdio ,gano : this.gano, jugadas : this.jugadas}});
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
    this.alert.presentAlertError('Se acabo el tiempo', 'La palabra era ' + this.playGame.wordOrd, 'OK');
    this.lose = true;
    this.resultado = "Fin"
    this.time = 0;
    this.gano = this.partida.gano;
    this.perdio = this.partida.perdio + 1;
    this.jugadas =  this.partida.jugadas + 1;
    this.firebase.updateData('games', this.user.uid, {anagrama : {perdio : this.perdio ,gano : this.gano, jugadas : this.jugadas}});  
  }

  obtenerPartida(){
    var partidas : any;
    this.firebase.getDataQuery('games').subscribe(element =>{
      partidas = element;
      partidas.forEach(element => {
        if(element.id == this.user.uid){
          this.partida = element.anagrama;
          console.log(this.partida)
        }
      });
    })
  }
}