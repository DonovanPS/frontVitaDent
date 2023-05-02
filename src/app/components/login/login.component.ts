import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    user: '',
    password: ''
  }

  constructor(
    private autService: AuthService,
    private router: Router
  ){
  }

  ngOnInit(){
  }

  logIn(){

   
    this.autService.singin(this.user).subscribe( (res:any) =>{


      if(res=='Usuario o contraseña incorrectas'){
        alert(res);
      }else{

        localStorage.setItem('token',res.token);

        this.router.navigate(['home']);
      }

      //this.router.navigate{}
    })
  }
}
