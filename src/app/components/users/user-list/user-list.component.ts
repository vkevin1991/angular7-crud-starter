import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.checkPermission('all')) {
      this.router.navigate(['']);
    }
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
  }
  checkPermission(key: string) {
    return this.authService.evaluatePermissions(key);
  }

  editUser(userId: any) {
    this.router.navigate([`/user/${userId}`]);
  }

  deleteUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(() => {
      const userIndex = this.users.findIndex((user: any) => user.id === userId);
      this.users.splice(userIndex, 1);
    });
  }

}
