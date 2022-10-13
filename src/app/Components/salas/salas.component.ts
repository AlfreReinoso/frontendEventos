import { Component, OnInit } from '@angular/core';
import {Sala} from '../../model/sala';
import {SalaService} from '../../Services/sala.service';
import {AUTHENTICATED_USER} from "../../Services/basic-jwtauth-services.service";

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  salas: Sala[] = [];

  constructor(private salaservice: SalaService ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem(AUTHENTICATED_USER)){
      this.salaservice.getSalas().subscribe(
        (response: Sala[]) => {
          this.salas = response;
          console.log(this.salas);
          console.log(response);
        }
      )
    }
  }

}
