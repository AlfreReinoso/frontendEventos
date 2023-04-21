import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Evento} from "../../../model/evento"
import {Servicio} from "../../../model/servicio";
import {EventoServicesService} from "../../../Services/evento-services.service";
import {MessageService} from "primeng/api";
import {ServicioService} from "../../../Services/servicios.service";
import {Salon} from "../../../model/salon";
import {SalaService} from "../../../Services/sala.service";
import {ClientesService} from "../../../Services/clientes.service";
import {Cliente} from "../../../model/cliente";

import {ActivatedRoute, Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {EventosState} from "../../../State/evento.state";
import {ClienteState} from "../../../State/cliente.state";
import {AdministrativoState} from "../../../State/adm.state";
import {Administrativo} from "../../../model/administrativo";
import {Observable} from "rxjs";


@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {

  @Select(AdministrativoState.getAdministrativo)isAdm$:Observable<boolean>;

  id:number = 0;
  eventos:Evento[]= [];
  evento: Evento = new Evento();

  servicios: Servicio[] = [];

  salones : Salon [] = [];

  clientes : Cliente[]=[];

  constructor(private router:Router,
    private service:EventoServicesService,
    private _messageService: MessageService,
    private _eventoService: EventoServicesService,
    private _servicioService: ServicioService,
    private _salonesService: SalaService,
    private _clienteService: ClientesService, private store: Store,  private route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._servicioService.findAll().subscribe(
      (response: any)=>{
        this.servicios = response;
      })
    this._salonesService.getSalas().subscribe(
      (response : any)=>{
        this.salones = response;
      }
    )
    this._clienteService.getClientes().subscribe(
      (data:any)=>{
        this.clientes = data;
      }
    )

    this.id = this.route.snapshot.params['id'];

    if(this.id>0){
      this.evento.salon = this.store.selectSnapshot(EventosState.getSalon);
      this.evento.servicios = this.store.selectSnapshot(EventosState.getServicio);
      this.evento.cliente = this.store.selectSnapshot(ClienteState.getCliente);
    }
  }

  saveEvento() {
    if(this.evento.fechaEvento == null || this.evento.cantidadPersonas === 0 ||
      this.evento.salon == null || this.evento.cliente == null ){
      this._messageService.clear();
      this._messageService.add({severity:'error', summary: 'Atención',
        detail: `Faltan ingresar datos` }
      );
    }else{
      this.evento.fechaReserva = new Date();
      this.evento.cantidadPersonas = Number(this.evento.cantidadPersonas);
      // console.log('evento antes de insertar',this.evento);
      // this._messageService.
      this._eventoService.insertEvento(this.evento).subscribe(
        (data)=> {
          this._messageService.clear();
          this._messageService.add({ severity:'success', summary:'Exito!',detail: 'Se guardo correctamente'});
          this.router.navigate(['eventos'])
          // console.log('Evento del backend',data)
        }, error =>{
          // console.log(error)
          this._messageService.clear();
          this._messageService.add({ severity:'error', summary: 'Error!',
            detail: error.error.message }
          );
        }
      );
    }
    }

}
