import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Tateti } from '../../../classes/tateti';
import { Router } from '@angular/router';

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

  constructor(public router: Router) {
    this.playGame = new Tateti();
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
    console.log(this.result)
    if (this.result == 'GANO' || this.result == 'PERDIO') {
      this.reset();
      this.fin = true;
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
}
