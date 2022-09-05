import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { EventoServicesService } from 'src/app/Services/evento-services.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  message: String = '' +
    '';
  eventos = [
    { idEvento: 1, nomEvento: 'Aires' },
    { idEvento: 2, nomEvento: 'Tamarindo' },
    { idEvento: 3, nomEvento: 'DelCielo' },
    { idEvento: 5, nomEvento: 'Cristal' },
  ];

  constructor(private route:ActivatedRoute, private service:EventoServicesService) {

  }

  ngOnInit(): void {}

  getSaludo(nombre: String){
    //console.log('Aloha');
    console.log(this.service.getDataEventos(nombre));
    this.service.getDataEventos(nombre).subscribe(
        (response: any) => {console.log(response);
      this.message = response.message;}
    );

  }
}
