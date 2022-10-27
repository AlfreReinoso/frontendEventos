import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiciosService} from "../Services/servicios.service";
import {Servicio} from "../model/servicio";
import { Store } from '@ngxs/store';
import { AddServicios, AddServiciosForArray, ServicioState } from '../State/servicio.state';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  id_salon: number = 0
  todosServicios: any[] = [];
  selectedServices : Servicio[] = [];

  constructor(private router : Router,
              private route : ActivatedRoute,
              private _servicioService : ServiciosService,
              private store: Store) { }

  ngOnInit(): void {
    this.id_salon = this.route.snapshot.params['id'];

    if(this.id_salon > 0){
      this._servicioService.getServicios().subscribe(
        (response: Servicio)=> {
          console.log(response) ;
          // @ts-ignore
          this.todosServicios = response;
        }
      );
    }


  }

  selectServicio(servicio: Servicio) : void{
    this.selectedServices.push(servicio);
    //this.store.dispatch(new AddServicios(servicio));
    // console.log($event);
    console.log(this.selectedServices);
  }
  goToReserva(){
    console.log('navegando al serviciocomponent');
    // URL PARA RESERVAR EVENTO
    this.store.dispatch(new AddServiciosForArray(this.selectedServices));
    let serviciosState = this.store.selectSnapshot(ServicioState.getServicios);
    console.log(serviciosState);
  }

  newOrEditeServicio(id_servicio:number){
    this.router.navigate(['/servicio',id_servicio]);
  }
}
