import {Component, Input, OnInit} from '@angular/core';
import {BasicJWTAuthServicesService} from "../../Services/basic-jwtauth-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() showLogin : boolean =  true;

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

            this.invalidLogin = false;
            this.showLogin = false;
          console.log(this.showLogin);
         // this.router.navigate(['salas']).then(r => console.log(r));

        },
        (error: any) => {
          // console.log(error);
          this.invalidLogin = true;
        }
      );
  }

}
