import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TipoServicio } from 'src/app/model/tiposervicio';
import { TipoServicioService } from 'src/app/Services/tipo-servicio.service';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  styleUrls: ['./tipo-servicio.component.css']
})
export class TipoServicioComponent implements OnInit {

  tiposDeServicios: TipoServicio[] = [];
  tipoServicioSinModificar: TipoServicio = new TipoServicio();

  constructor(
    private router : Router,
    private _messageService: MessageService,
    private _tipoServicioService: TipoServicioService,
    ) { }

  ngOnInit(): void {
    this._tipoServicioService.findAll().subscribe(tipos => {
      this.tiposDeServicios = tipos;
    });
  }

  editar(tipoServicio: TipoServicio) {
    this.tipoServicioSinModificar = {...tipoServicio};
  }

  eliminar(tipoServicio: TipoServicio) {
    this.tipoServicioSinModificar = tipoServicio;
    this._messageService.clear();
    this._messageService.add({ key: 'confirmar-c', sticky: true, severity:'warn', summary:'Desea eliminar el tipo de servicio?', detail:'Confirma para proceder' });
  }

  guardar(tipoServicio: TipoServicio) {
    if (tipoServicio.denominacion != "") {
      this._tipoServicioService.update(tipoServicio).subscribe(tipoServicioBackend =>
        this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Tipo de servicio actualizado correctamente' })
      );
    } else {
      this._messageService.clear();
      this._messageService.add({ key: 'atencion', severity:'warn', summary: 'Atención', detail: 'Debe ingresar todos los campos requeridos' });
    }
  }

  cancelar(tipoServicio: TipoServicio, indiceFila: number) {
    this.tiposDeServicios[indiceFila] = this.tipoServicioSinModificar;
  }

  volver() {
    this.router.navigate(['salas']);
  }

  aceptarMsj() {
    this._tipoServicioService.delete(this.tipoServicioSinModificar).subscribe(value => {
      console.log("hola");
      this.tiposDeServicios.splice(this.tiposDeServicios.indexOf(this.tipoServicioSinModificar), 1);
      this._messageService.clear();
      this._messageService.add({ severity:'success', summary: 'Éxito', detail: 'Tipo de servicio eliminado correctamente' })
    });
  }

  cancelarMsj() {
    this._messageService.clear();
  }
}
