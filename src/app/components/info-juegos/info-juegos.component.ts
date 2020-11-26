import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-juegos',
  templateUrl: './info-juegos.component.html',
  styleUrls: ['./info-juegos.component.css']
})
export class InfoJuegosComponent implements OnInit {

  @Input('victorias') victorias : number;
  @Input('derrotas') derrotas : number;
  @Input('juego') juego : number;

  constructor() { }

  ngOnInit(): void {
  }

}
