import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import {SalaService} from "../../Services/sala.service";
import {Salon} from "../../model/salon";

@Component({
  selector: 'app-salon-component',
  templateUrl: './salon-component.component.html',
  styleUrls: ['./salon-component.component.css']
})
export class SalonComponentComponent implements OnInit {

  id:number = 0;
  salon: Salon = new Salon;

  constructor(private router:Router,private route : ActivatedRoute, private _salaService : SalaService) { }

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
    if(this.id > 1 ){
      this._salaService.updateSalon(this.salon).subscribe(
          (data: any) => console.log(data));
    }else {
      this._salaService.createSalon(this.salon).subscribe(
        (data:any)=> console.log(data));
    }
    this.router.navigate(['salas']);;

  }

  deleteSalon() {
    this._salaService.deleteSalon(this.id).subscribe(
      (data:any)=> console.log(data)
    );
  }

  selectSalon() {
    this.router.navigate(['servicios', this.salon.idSalon]);
  }
}
