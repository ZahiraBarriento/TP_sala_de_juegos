import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user : any;
  partida : any = [];
  aux : any;

  constructor(private firebase : FirebaseService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userCurrent'));
    this.obtenerPuntaje();
  }

  obtenerPuntaje(){
    var partidas : any;
    this.firebase.getDataQuery('games').subscribe(element =>{
      partidas = element;
      partidas.forEach(element => {
        if(element.id == this.user.uid){
          this.partida.push(element);
        }
      });
    })
  }
}
