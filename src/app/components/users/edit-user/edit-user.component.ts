import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/post.service';
import { UserService } from 'src/app/user.service';
import { Category } from 'src/app/models/Category';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userId: string;
  editForm: FormGroup;
  submitted: boolean = false;
  user: any;
  roles: any;
  isCreate: boolean = false;
  error: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.checkPermission('all')) {
      this.router.navigate(['']);
    }
    this.data.changeTitle("Edit User")

    this.userService.getRoles().subscribe((data: Category[]) => {
      this.roles = data;
    });
    let groupForm = {
      id: [],
      name: ['', Validators.required],
      role: ['', Validators.required],
    };
    let userId = this.route.snapshot.paramMap.get('id');
    if(userId === 'create'){
      this.isCreate = true;
      groupForm['password'] = ['', Validators.required]
    }
    this.editForm = this.formBuilder.group(groupForm);
    if (!userId) {
      this.router.navigate(['/user']);
    }
    if(!this.isCreate){
      this.userId = userId;
      this.userService.getUser(userId).subscribe((user: any) => {
        user.role = [user.role.id];
        this.editForm.patchValue(user);
      });
    }
  }

  checkPermission(key: string) {
    return this.authService.evaluatePermissions(key);
  }

  onSubmit() {
    this.submitted = true;
    let currentUser = this.editForm.value;
    currentUser.role = currentUser.role[0];
    if (this.editForm.valid) {
      if(this.isCreate){
        currentUser.posts = [];
        this.userService.addUser(currentUser)
          .subscribe(data => {
            this.router.navigate(['/user']);
          },error=>{
            this.error = error.error;
          })
      }else{
        this.userService.editUser(this.editForm.value)
          .subscribe(data => {
            this.router.navigate(['/user']);
          }, error=>{
            this.error = error.error;
          });
      }
    }
  }

  cancel() {
    this.router.navigate(['/user']);
  }

  get f() { return this.editForm.controls; }
}
