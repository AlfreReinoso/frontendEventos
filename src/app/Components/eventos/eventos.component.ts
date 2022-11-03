import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { EventoServicesService } from 'src/app/Services/evento-services.service';
import {Servicio} from "../../model/servicio";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  eventoSinModificar: Evento = new Evento();

  message: String = '' +
    '';
  eventos : Evento[] = [];

  constructor(private route:ActivatedRoute,
              private service:EventoServicesService,
              private _messageService: MessageService,
              private _eventoService: EventoServicesService
  ) {

  }

  ngOnInit(): void {
    this.service.getDataEventos().subscribe(
      (response: any) => {console.log(response);
        console.log(response);
        this.eventos = response;
        this.message = response.message;}
    );
  }

  editar(evento: Evento) {
    this.eventoSinModificar = {...evento};
  }

  eliminar(evento: Evento) {
    this.eventoSinModificar = evento;
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el servicio?', detail:'Confirma para proceder' });
  }

  guardar(evento: Evento) {
    console.log(evento);
    if (evento.salon.denominacion != null &&
        evento.cliente.apellido != null &&
        evento.cantPersonas != null) {
      console.log('dentro del if');
      this._eventoService.updateEventos(evento).subscribe(servicioBackend =>
        this._messageService.add({ severity:'success', summary: 'Éxito', detail: `Evento del dia ${evento.fechaEvento} actualizado correctamente` }));
    } else {
      this._messageService.clear();
      this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  cancelar(servicio: Servicio, indiceFila: number) {
    this.eventos[indiceFila] = this.eventoSinModificar;
  }


}
