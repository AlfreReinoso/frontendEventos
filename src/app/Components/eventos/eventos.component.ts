import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos = [
    { idEvento: 1, nomEvento: 'Aires' },
    { idEvento: 2, nomEvento: 'Tamarindo' },
    { idEvento: 3, nomEvento: 'DelCielo' },
    { idEvento: 5, nomEvento: 'Cristal' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
