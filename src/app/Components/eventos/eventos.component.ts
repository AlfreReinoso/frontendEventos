import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/model/evento';
import { EventoServicesService } from 'src/app/Services/evento-services.service';
import {Servicio} from "../../model/servicio";
import {MessageService} from "primeng/api";
import {ServicioService} from "../../Services/servicios.service";
import {Salon} from "../../model/salon";
import {SalaService} from "../../Services/sala.service";
import {ClientesService} from "../../Services/clientes.service";
import {Cliente} from "../../model/cliente";
import {ClienteState} from "../../State/cliente.state";
import {AdministrativoState} from "../../State/adm.state";
import {Administrativo} from "../../model/administrativo";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {

  mostrarButtonAgregar = false;

  eventoSinModificar: Evento = new Evento();

  message: String = '' +
    '';
  eventos : Evento[] = [];
  servicios: Servicio[]=[];
  salas : Salon[]=[]
  clientes: Cliente[]=[];

  administrativo: Administrativo;
  cliente: Cliente;

  constructor(private route:ActivatedRoute,
              private service:EventoServicesService,
              private _messageService: MessageService,
              private _eventoService: EventoServicesService,
              private _servicioService: ServicioService,
              private _salasService: SalaService,
              private _clienteService: ClientesService,
              private store:Store,
  ) {

  }

  ngOnInit(): void {
    this.pedirStateUser();
    this._servicioService.findAll().subscribe((servicioBackend) => {
      this.servicios = servicioBackend;
    })
    this._salasService.getSalas().subscribe(
      (response: Salon[]) => {
        console.log(response)
        this.salas = response;
      }
    )
    
      if(this.administrativo){
        this.listar();
        this._clienteService.getClientes().subscribe(
          (data:any)=>{
            this.clientes = data;
          }
        )
      }else if(this.cliente.idUsuario !=0){
        this.clientes.push(this.cliente);
        this._eventoService.getDataEventosForCliente(this.cliente).subscribe((eventos)=>{
          this.eventos = eventos
        });
      }
  }

   pedirStateUser(){
    // await new Promise(r => setTimeout(r, 500));
    this.cliente = this.store.selectSnapshot(ClienteState.getCliente);
    this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo);

  }

  listar(){
    this.service.getDataEventos().subscribe(
      (response: any) =>{
        // console.log(response)
        this.eventos = response;
        this.message = response.message;}
    );
  }

  editar(evento: Evento) {
    this.mostrarButtonAgregar = true;
    this.eventoSinModificar = {...evento};
  }

  eliminar(evento: Evento) {
    this.eventoSinModificar = evento;
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el evnto?', detail:'Confirma para proceder' });
  }

  guardar(evento: Evento) {
    this.mostrarButtonAgregar = false;
    if (evento.salon.denominacion != '' &&
        evento.cliente.apellido != '' &&
        evento.cantidadPersonas !== 0 
        )
    {
      this._eventoService.updateEventos(evento).subscribe((eventoBackend) => {
          // console.log("evento del backend",eventoBackend);
          this._messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `Evento del dia ${eventoBackend.fechaEvento} actualizado correctamente`
          });
        },(error)=>{
          this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: `Error al guardar` }
          );
        });
      //this.listar();
    } else {
          this._messageService.clear();
          this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  cancelar(evento: Evento, indiceFila: number) {
    this.mostrarButtonAgregar = false;
    this.eventos[indiceFila] = this.eventoSinModificar;
  }

  eliminarServicio(evento: Evento, i : number) {
    evento.servicios.splice(i,1);
  }

  agregarServicio(evento: Evento) {
    evento.servicios.push(new Servicio());
  }

  aceptarMsj() {
    this._eventoService.deleteEventos(this.eventoSinModificar.nroReserva).subscribe(value => {
      this.eventos.splice(this.eventos.indexOf(this.eventoSinModificar), 1);
      this._messageService.clear();
      this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Evento eliminado correctamente' })
    });
  }

  cancelarMsj() {
    this._messageService.clear();
  }
}
