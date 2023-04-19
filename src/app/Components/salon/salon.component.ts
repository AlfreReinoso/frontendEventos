import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SalaService} from "../../Services/sala.service";
import {Salon} from "../../model/salon";
import {Store} from "@ngxs/store";
import {AddEvento, AddSalon, EventosState} from "../../State/evento.state";
import {Cliente} from "../../model/cliente";
import {ClienteState} from "../../State/cliente.state";
import {AdministrativoState} from "../../State/adm.state";
import {Administrativo} from "../../model/administrativo";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  id:number = 0;
  salon: Salon = new Salon;
  cliente: Cliente;
  administrativo:Administrativo;

  constructor(private store: Store,private router:Router,private route : ActivatedRoute, private _salaService : SalaService,
              private _messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.cliente = this.store.selectSnapshot(ClienteState.getCliente)
    this.administrativo = this.store.selectSnapshot(AdministrativoState.getAdministrativo)
    this.id = this.route.snapshot.params['id'];

    if(this.id > 0){
      this._salaService.getSalon(this.id).subscribe(
        (response: Salon) => {
          this.salon = response ;
        }
      );
    }

  }

  saveSalon(){
    if(this.salon.denominacion != " " && this.salon.capacidad > 0 && this.salon.costoPorDia > 0){
      if(this.id > 1 ){
        this._salaService.updateSalon(this.salon).subscribe(
          (data:any)=> {
            this._messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: `Salon guardado correctamente`
            });
            this.router.navigate(['salas']);
          }, (error: any) =>{
            this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: `${error.error.message}` }
            );
          })
      }else {
        this._salaService.createSalon(this.salon).subscribe(
          (data:any)=> {
            this._messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: `Salon guardado correctamente`
            });
            this.router.navigate(['salas']);
          }, (error: any) =>{
            this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención', detail: `${error.error.message}` }
            );
          })
      }
    } else {
      this._messageService.add({  key: 'atencion', severity:'warn', summary: 'Atención',
        detail: `Datos incorrectos` }
      );
    }
  }

  deleteSalon() {
    this._salaService.deleteSalon(this.id).subscribe(
      (data:any)=> this.router.navigate(['salas'])
    );
  }

  selectSalon() {
    this.store.dispatch(new AddSalon(this.salon))
    // console.log(this.store.selectSnapshot(EventosState))
    this.router.navigate(['servicios', this.salon.idSalon]);
  }

}
