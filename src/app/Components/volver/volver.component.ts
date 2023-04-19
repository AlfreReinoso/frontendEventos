import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-volver',
  templateUrl: './volver.component.html',
  styleUrls: ['./volver.component.css']
})
export class VolverComponent implements OnInit {

  constructor(    private router:Router) { }

  ngOnInit(): void {
  }

  volver(){
    this.router.navigate(['/salas'])
  }
}
