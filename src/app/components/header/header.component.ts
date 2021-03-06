import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  permissions: any;
  openMenu: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}
  checkPermission(key: string){
    return this.authService.evaluatePermissions(key);
  }
  toogleMenu(){
    this.openMenu = !this.openMenu;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['login/']);
  }



}
