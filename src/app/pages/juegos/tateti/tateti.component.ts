import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Tateti } from '../../../classes/tateti';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  random; //para hacer movimiento pc
  playGame: Tateti; //clase juego
  user = "-"; //signo usuario
  compu = "-"; //signo pc
  buttonSelect: boolean = false; //que selecciona el usuario
  gameTable: boolean = true; //tateti
  fin: boolean = false;
  result: string;
  userCurrent : any;
  partida : any;
  gano : number = 0;
  perdio : number = 0;
  empate : number = 0;
  jugadas : number = 0;

  constructor(
    public router: Router, 
    private firebase : FirebaseService,
    private alert : AlertService) {
    this.playGame = new Tateti();
    this.userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
    this.obtenerPartida();
  }

  ngOnInit() {
  }

  select(signo) {
    //una vez que selecciona oculto
    this.buttonSelect = true;
    this.gameTable = false;

    //indico que signo le pertenece a cada uno
    if (signo == "X") {
      this.user = "x";
      this.compu = "o";
      this.playGame.compuSigno = 'o';
    }
    else {
      this.user = "o";
      this.compu = "x";
      this.playGame.compuSigno = 'x';
    }
  }

  play(id) {

    if (this.playGame.lugares[id] == "-") {

      //coloco el la figura que le eligio en el lugar 
      document.images['l' + id].src = "../../../assets/image/" + this.user + ".png";
      //asigno a la tabla que ese lugar ya esta ocupado
      this.playGame.lugares[id] = this.user;

      //hago un movimiento de la computadora
      this.playCompu();

    }

    this.result = this.playGame.game(this.user);
    if(this.result == 'GANO'){
      this.alert.presentAlertSuccess('GANASTE', 'Has ganado la partida.', 'OK');
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.fin = true;
      this.gano = this.partida.gano + 1;
      this.perdio = this.partida.perdio;
      this.empate = this.partida.empate;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.userCurrent.uid, {tateti : {perdio : this.perdio, gano : this.gano, empate: this.empate, jugadas : this.jugadas}});
    }else if(this.result == 'PERDIO'){
      this.alert.presentAlertError('PERDISTE', 'Has perdido la partida.', 'OK');
      setTimeout(() => {
        location.reload();
      }, 1500);
      this.fin = true;
      this.gano = this.partida.gano;
      this.perdio = this.partida.perdio + 1;
      this.empate = this.partida.empate;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.userCurrent.uid, {tateti : {perdio : this.perdio, gano : this.gano, empate: this.empate, jugadas : this.jugadas}});
    }
  }

  playCompu() {
    //lugar random de la tabla
    this.random = Math.floor(Math.random() * 9);

    //busco un lugar vacio y se lo asigno al signo de la pc
    if (this.playGame.lugares[this.random] == "-") {
      //asigno a la tabla que ese lugar ya esta ocupado
      this.playGame.lugares[this.random] = this.compu;
      document.images['l' + this.random].src = "../../../assets/image/" + this.compu + ".png";
    } else {//si no hay lugar vacio que vuelva a jugar
      this.playCompu();
    }
  }

  reset(){
    setTimeout(() =>{
      window.location.reload();
    }, 2000);
  }

  
  obtenerPartida(){
    var partidas : any;
    this.firebase.getDataQuery('games').subscribe(element =>{
      partidas = element;
      partidas.forEach(element => {
        console.log(element.id)
        if(element.id == this.userCurrent.uid){
          this.partida = element.tateti;
          console.log(this.partida)
        }
      });
    })
  }
}
