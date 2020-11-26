import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
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
  user : any;
  partida : any;
  gano : number = 0;
  perdio : number = 0;
  empate : number = 0;
  jugadas : number = 0;

  constructor(private firebase : FirebaseService) { 
    this.playGame = new RockPaperScissors();
    this.user = JSON.parse(localStorage.getItem('userCurrent'));
    this.obtenerPartida();
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
    if(this.result == 'GANASTE'){
      this.gano = this.partida.gano + 1;
      this.empate = this.partida.empate;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.user.uid, {ppt : {perdio : this.perdio, gano : this.gano, empate: this.empate, jugadas : this.jugadas}});
    }else if(this.result == 'PERDISTE'){
      this.gano = this.partida.gano;
      this.perdio = this.partida.perdio + 1;
      this.empate = this.partida.empate;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.user.uid, {ppt : {perdio : this.perdio, gano : this.gano, empate: this.empate, jugadas : this.jugadas}});
    }else if(this.result == 'EMPATE'){
      this.gano = this.partida.gano;
      this.perdio = this.partida.perdio;
      this.empate = this.partida.empate + 1;
      this.jugadas =  this.partida.jugadas + 1;
      this.firebase.updateData('games', this.user.uid, {ppt : {perdio : this.perdio, gano : this.gano, empate: this.empate, jugadas : this.jugadas}});
    }
  }

  obtenerPartida(){
    var partidas : any;
    this.firebase.getDataQuery('games').subscribe(element =>{
      partidas = element;
      partidas.forEach(element => {
        console.log(element.id)
        if(element.id == this.user.uid){
          this.partida = element.ppt;
          console.log(this.partida)
        }
      });
    })
  }

}
