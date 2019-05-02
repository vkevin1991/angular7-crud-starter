import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string = '';
  password: string = '';
  hasError: boolean = false;
  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login(){
    this._authService.login({
      name: this.name,
      password: this.password
    }).subscribe((tokenInfo: any)=>{
      this._authService.setToken(tokenInfo.token);
      this.router.navigate(['list-post']);
    },(error: any)=>{
      this.hasError = true;
      console.error(error);
    });
  }

}
