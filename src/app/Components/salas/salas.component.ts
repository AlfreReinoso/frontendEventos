import { Component, OnInit } from '@angular/core';
import {Sala} from '../../model/sala';
import {SalaService} from '../../Services/sala.service';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {

  salas: Sala[] = [];

  constructor(private salaservice: SalaService ) { }

  ngOnInit(): void {
    this.salaservice.getSalas().subscribe(
        (response: Sala[]) => {
          this.salas = response;
          console.log(this.salas);
        }
    )
  }

}
