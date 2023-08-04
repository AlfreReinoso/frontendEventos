import { TipoUsuario } from "./tipousuario";

export class Usuario {
  idUsuario: number = 0 ;
  tipoDocumento : string = '';
  nroDocumento: string = '';
  apellido : string = '';
  nombre: string = '';
  mail : string = '';
  telefono : string = '';
  usuarioName: string ='';
  tipoUsuario: TipoUsuario;

  constructor() {
  }
}
