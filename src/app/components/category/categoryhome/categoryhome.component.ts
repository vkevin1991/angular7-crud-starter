import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-categoryhome',
  templateUrl: './categoryhome.component.html',
  styleUrls: ['./categoryhome.component.scss']
})
export class CategoryhomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  checkPermission(key: string) {
    return this.authService.evaluatePermissions(key);
  }

}
