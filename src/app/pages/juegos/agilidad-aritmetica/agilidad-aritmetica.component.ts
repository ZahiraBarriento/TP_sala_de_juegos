import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ArithmeticAgility } from '../../../classes/arithmetic-agility';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  //PONER CONTADOR

  playGame: ArithmeticAgility;
  check: boolean = true;
  enter: any;
  count: any;
  time: number = 30;
  display : boolean = false;
  game : boolean = false;
  user : any;
  gano : number;
  perdio : number;
  partida : any;
  jugadas : number = 0;

  constructor(private firebase : FirebaseService, private alert : AlertService) {
    this.playGame = new ArithmeticAgility();
    this.user = JSON.parse(localStorage.getItem('userCurrent'));
  }

  ngOnInit(): void {
    this.obtenerPartida();
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

  checkNum(){ //verifica el numero iungresado
    this.gano =0;
    this.perdio = 0;

    if (this.playGame.count < 5)
    {
      this.playGame.checkGame();
      this.playGame.numEnter = null;
      this.playGame.game();
    }else{
      this.playGame.checkGame();
      this.game = false
      clearInterval(this.count);
      this.gameOver();
      this.check = true;
      this.time = 30;
      this.gano = this.partida.gano + this.playGame.success;
      this.jugadas =  this.partida.jugadas + 1;
      this.perdio = this.partida.perdio + (this.playGame.count - this.playGame.success);
      this.firebase.updateData('games', this.user.uid, {agilidad : {perdio : this.perdio, gano : this.gano, jugadas : this.jugadas}});
    }
  }

  obtenerPartida(){
    var partidas : any;
    this.firebase.getDataQuery('games').subscribe(element =>{
      partidas = element;
      
      partidas.forEach(element => {
        if(element.id == this.user.uid){
          this.partida = element.agilidad;
        }
      });
    })
  }

  gameOver() {
    this.alert.presentAlert('FIN DEL JUEGO', 'Cantidad de aciertos: ' + this.playGame.success + '/' + this.playGame.count, 'OK');
    this.playGame.numEnter = null;
    this.playGame.num1 = null;
    this.playGame.num2 = null;
    this.playGame.operator = null;
    this.display = true;
    this.gano = this.partida.gano + this.playGame.success;
    this.jugadas =  this.partida.jugadas + 1;
    this.perdio = this.partida.perdio + (this.playGame.count - this.playGame.success);
    this.firebase.updateData('games', this.user.uid, {agilidad : {perdio : this.perdio, gano : this.gano, jugadas : this.jugadas}});
  }

}
