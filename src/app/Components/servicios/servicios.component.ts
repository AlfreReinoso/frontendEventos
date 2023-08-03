import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from 'primeng/api';
import { Servicio } from 'src/app/model/servicio';
import { ServicioService } from 'src/app/Services/servicios.service';
import { TipoServicioService } from 'src/app/Services/tipo-servicio.service';
import {Store} from "@ngxs/store";
// import {AddServicios} from "../../State/servicio.state";
import {AddServicio, EventosState} from "../../State/evento.state";
import {ClienteState} from "../../State/cliente.state";
import {AdministrativoState} from "../../State/adm.state";
import {Cliente} from "../../model/cliente";
import {Administrativo} from "../../model/administrativo";
const _ = require('lodash');


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {


  servicios: Servicio[] = [];
  tiposDeServicios: String[] = [];
  serviciosState: Servicio[]= [];
  servicioSinModificar: Servicio = new Servicio();
  cliente: Cliente;
  administrativo:Administrativo;

  constructor(
    private router : Router,
    private store: Store,
    private route : ActivatedRoute,
    private _messageService: MessageService,
    private _servicioService : ServicioService,
    private _tipoServicioService: TipoServicioService,
    ) { }

  ngOnInit() {
    this.cliente = this.store.selectSnapshot(ClienteState.getCliente)
    this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo)
  
    if(this.store.selectSnapshot(EventosState.getServicio).length!=0){
      // console.log('hay servicios en el state')
      console.log(this.store.selectSnapshot(EventosState.getServicio))
      // this.serviciosState = this.store.selectSnapshot(EventosState.getServicio);
      this.servicios = _.cloneDeep(this.store.selectSnapshot(EventosState.getServicio));
      // this.servicios = this.store.selectSnapshot(EventosState.getServicio);
      
    }else{
      this._servicioService.findAll().subscribe(serviciosBack => {
        this.servicios = serviciosBack;
        // console.log(this.servicios)
        
      })
    }
    let id = this.route.snapshot.params['id'] ;
        if(id!=null){
          this._servicioService.findOne(id).subscribe((servicioAgregado:Servicio)=>{
            this.servicios = [...this.servicios, servicioAgregado]
            // this.servicios.push(servicioAgregado)
          })
    
        };
   

    this._tipoServicioService.findAll().subscribe(tipos => {
      this.tiposDeServicios = tipos.map(tipo => { return tipo.denominacion});
    });
  }

  editar(servicio: Servicio) {
    this.servicioSinModificar = {...servicio};
  }

  eliminar(servicio: Servicio) {

    this.servicioSinModificar = {...servicio};
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el servicio?', detail:'Confirma para proceder' });
  }

  guardar(servicio: Servicio) {
    if (servicio.denominacion != "" && servicio.costoPorDia != null) {
      this._servicioService.update(servicio).subscribe(servicioBackend =>
        this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio actualizado correctamente' })
      );
    } else {
      this._messageService.clear();
      this._messageService.add({ key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  nuevoServicio() {
    this.router.navigateByUrl('/serviciosForm');
  }

  cancelar(servicio: Servicio, indiceFila: number) {
    this.servicios[indiceFila] = this.servicioSinModificar;
  }

  volver() {
    this.router.navigate(['salas']);
  }
  siguiente(){
    this.store.dispatch(new AddServicio(this.servicios));
    if(this.store.selectSnapshot(EventosState.getSalon)!= undefined){
      // console.log('hay salon')
      this.router.navigate(['eventoForm/1'])
    }else {
      this.router.navigate(['salas']) 
    }
    
  }

  aceptarMsj() {
    if(this.administrativo){
     
      this._servicioService.delete(this.servicioSinModificar.idServicio).subscribe(value => {
     
        this.servicios = this.servicios.filter(item => 
          item.idServicio !== this.servicioSinModificar.idServicio);
  
        this.store.dispatch(new AddServicio(this.servicios));
 
        this._messageService.clear();
        this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio eliminado correctamente' })
        
      }); 
    }else if ( this.cliente){

      this.servicios = this.servicios.filter(item => 
        item.idServicio !== this.servicioSinModificar.idServicio);

      this.store.dispatch(new AddServicio(this.servicios));


      this._messageService.clear();
      this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio eliminado correctamente' })
    };

  } 

  cancelarMsj() {
    this._messageService.clear();
  }
}
