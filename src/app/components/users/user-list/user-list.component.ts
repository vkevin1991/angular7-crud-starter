import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.users = users;
    });
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
