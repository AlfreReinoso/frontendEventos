import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SalaService} from "../../Services/sala.service";
import {Salon} from "../../model/salon";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  id:number = 0;
  salon: Salon = new Salon;

  constructor(private router:Router,
              private _messageService: MessageService,
              private route : ActivatedRoute, private _salaService : SalaService) { }

  ngOnInit(): void {
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
    this.router.navigate(['servicios', this.salon.idSalon]);
  }
}
