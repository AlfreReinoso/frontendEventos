import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Servicio } from 'src/app/model/servicio';
import { TipoServicio } from 'src/app/model/tiposervicio';
import { ServicioService } from 'src/app/Services/servicios.service';
import { TipoServicioService } from 'src/app/Services/tipo-servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  // id_salon: number = 0
  // todosServicios: any[] = [];
  // selectedServices : Servicio[] = [];
  servicios: Servicio[] = [];
  tiposDeServicios: String[] = [];
  servicioSinModificar: Servicio = new Servicio();

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private store: Store,
    private _messageService: MessageService,
    private _servicioService : ServicioService,
    private _tipoServicioService: TipoServicioService,
  ) { }

  // ngOnInit(): void {
  //   this.id_salon = this.route.snapshot.params['id'];

  //   if(this.id_salon > 0){
  //     this._servicioService.getServicios().subscribe(
  //       (response: Servicio)=> {
  //         console.log(response) ;
  //         // @ts-ignore
  //         this.todosServicios = response;
  //       }
  //     );
  //   }
  // }

  // selectServicio(servicio: Servicio) : void{
  //   this.selectedServices.push(servicio);
  //   //this.store.dispatch(new AddServicios(servicio));
  //   // console.log($event);
  //   console.log(this.selectedServices);
  // }
  
  // goToReserva(){
  //   console.log('navegando al serviciocomponent');
  //   // URL PARA RESERVAR EVENTO
  //   this.store.dispatch(new AddServiciosForArray(this.selectedServices));
  //   let serviciosState = this.store.selectSnapshot(ServicioState.getServicios);
  //   console.log(serviciosState);
  // }

  // newOrEditeServicio(id_servicio:number){
  //   this.router.navigate(['/serviciosForm', id_servicio]);
  // }

  ngOnInit() {
    this._servicioService.findAll().subscribe(serviciosBack => {
      this.servicios = serviciosBack;
    })

    this._tipoServicioService.findAll().subscribe(tipos => {
      this.tiposDeServicios = tipos.map(tipo => { return tipo.denominacion});
    });
  }

  editar(servicio: Servicio) {
    this.servicioSinModificar = {...servicio};
  }

  eliminar(servicio: Servicio) {
    this.servicioSinModificar = servicio;
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el servicio?', detail:'Confirma para proceder' });
  }

  guardar(servicio: Servicio) {
    if (servicio.denominacion != "" && servicio.costoPorDia != null) {
      this._servicioService.update(servicio).subscribe(servicioBackend =>
        this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio actualizado correctamente' }));
    } else {
      this._messageService.clear();
      this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  cancelar(servicio: Servicio, indiceFila: number) {
    this.servicios[indiceFila] = this.servicioSinModificar;
  }

  volver() {
    this.router.navigate(['salas']);
  }

  aceptarMsj() {
    this._servicioService.delete(this.servicioSinModificar).subscribe(value => {
      this.servicios.splice(this.servicios.indexOf(this.servicioSinModificar), 1);
      this._messageService.clear();
      this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Servicio eliminado correctamente' })
    });
  }

  cancelarMsj() {
    this._messageService.clear();
  }
}
