import { Component, OnInit } from '@angular/core';
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  invalidLogin: boolean = false;
  message: string = 'Error al loguearse';

  constructor(private router: Router,private basicAuthenticationServices: BasicJWTAuthServicesService) { }

  ngOnInit(): void {
  }

  handleJWTAuthLogin(){
    this.basicAuthenticationServices.executeJWTAuthenticationService(this.username, this.password)
      .subscribe(
          (data: any) => {
          // console.log(data);
          this.router.navigate(['salas']).then(r => console.log(r));
          this.invalidLogin = false;

        },
        (error: any) => {
          // console.log(error);
          this.invalidLogin = true;
        }
      );
  }

}
