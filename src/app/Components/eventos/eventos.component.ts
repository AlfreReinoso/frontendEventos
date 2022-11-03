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
  eventos : Evento[] = [];

  constructor(private route:ActivatedRoute, private service:EventoServicesService) {

  }

  ngOnInit(): void {
    this.service.getDataEventos().subscribe(
      (response: any) => {console.log(response);
        console.log(response);
        this.eventos = response;
        this.message = response.message;}
    );
  }


}
