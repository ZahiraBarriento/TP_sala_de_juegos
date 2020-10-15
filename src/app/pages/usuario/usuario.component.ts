import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { from } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  users: any = [];
  name : string;
  lastName : string;
  email: string;
  game : string;
  win : string;
  lose : string;

  constructor(
    public authService: AuthService,
    public router: Router,
    private bd: AngularFirestore) { }

  ngOnInit(): void {
    //obtener coleccion y guardar datos
    this.authService.getData().subscribe(data => {
      data.map(item => {
        const data: User = item.payload.doc.data() as User;
        data.iud = item.payload.doc.id;
        this.users.push(data);

      })
      //obtener los datos del usuario ingresado
      this.authService.getUserAuth().subscribe(user => {
        console.log(user)
        this.users.forEach(element => {
          if (element.uid == user.uid) {
            this.name = element.name;
            this.lastName = element.lastName;
            this.email = element.email;
            this.game = element.game;
            this.win = element.win;
            this.lose = element.lose;
          }
        });
      })
    });
  }

}
