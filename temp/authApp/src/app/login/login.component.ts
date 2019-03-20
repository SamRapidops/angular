import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginUserData = {};
  constructor(private _auth: AuthService,
			  private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
  	this._auth.loginUser(this.loginUserData)
  		.subscribe(
  			res => { 
        console.log('Hey'+this.loginUserData.email);
  				console.log(res);
  				localStorage.setItem('token' , res.token);
          //console.log(this.loginUserData.email);
          //localStorage.setItem('email' , this.loginUserData.email);
  				this._router.navigate(['/special']);
  			},
  			err => console.log(err)
  		)
  }

}
