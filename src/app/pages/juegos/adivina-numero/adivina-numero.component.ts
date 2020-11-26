import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { GuessNumber } from '../../../classes/guess-number';

@Component({
  selector: 'app-adivina-numero',
  templateUrl: './adivina-numero.component.html',
  styleUrls: ['./adivina-numero.component.css']
})
export class AdivinaNumeroComponent implements OnInit {

  playGame: GuessNumber;
  contador: number = 0;
  number: number;
  result: string;
  gano: number = 0;
  perdio: number = 0;
  otraVez: boolean = false;
  user: any;
  partida: any;
  activar: boolean = true;
  jugadas : number = 0;

  constructor(private firebase: FirebaseService) {
  }

  ngOnInit(): void {
    this.jugar();
    this.user = JSON.parse(localStorage.getItem('userCurrent'));
    this.obtenerPartida();
  }

  jugar() {
    this.playGame = new GuessNumber();
    this.otraVez = false;
  }

  play() {
    if (this.number != null) {
      this.contador++;
      const result = this.playGame.game(this.number)
      console.log(result);

      if (result) {
        this.result = 'Adivinaste!';
        this.gano = this.partida.gano + 1;
        this.perdio = this.partida.perdio;
        this.jugadas =  this.partida.jugadas + 1;
        this.firebase.updateData('games', this.user.uid, { adivina: { perdio: this.perdio, gano: this.gano, jugadas : this.jugadas}});
      }

      switch (this.contador) {
        case 1:
          if (!result) {
            this.result = "No, vuelve a intentar";
          }
          break;
        case 2:
          if (!result) {
            this.result = "Dicen que la tercera es la vencida";
            this.activar = false;
          }
          break;
        case 3:
          if (!result) {
            this.result = "No era como decian, ¡Intenta una vez mas!";
          }
          break;
        case 4:
          if (!result) {
            this.otraVez = true;
            this.activar = true;
            this.result = "¡Perdiste! El número era el: " + this.playGame.numSecret;
            this.perdio = this.partida.perdio + 1;
            this.gano = this.partida.gano;
            this.jugadas =  this.partida.jugadas + 1;
            this.firebase.updateData('games', this.user.uid, { adivina: { perdio: this.perdio, gano: this.gano, jugadas : this.jugadas} });
          }
          break;
      }
    } else {
      this.result = "Ingrese un número";
    }
  }

  obtenerPartida() {
    var partidas: any;
    this.firebase.getDataQuery('games').subscribe(element => {
      partidas = element;

      partidas.forEach(element => {
        if (element.id == this.user.uid) {
          this.partida = element.adivina;
        }
      });
    })
  }

  reset() {
    this.result = '';
    this.number = 0;
    this.jugar();
    this.contador = 0;
    this.activar = true;
  }

  ayuda() {
    if (this.number != null) {
      if (this.number < this.playGame.numSecret) {
        this.result = "El número es mas grande que " + this.number;
      } else if (this.number > this.playGame.numSecret) {
        this.result = "El número es mas chico que " + this.number;
      }
    }
  }
}
