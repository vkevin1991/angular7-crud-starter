import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/post.service';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/Category';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryId: string;
  editForm: FormGroup;
  submitted: boolean = false;
  post: Post;
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.checkPermission('putcategory')) {
      this.router.navigate(['/category']);
    }
    this.data.changeTitle("Edit Category")

    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required]
    });
    let categoryId = this.route.snapshot.paramMap.get('id');
    if (!categoryId) {
      this.router.navigate(['/category']);
    }
    this.categoryId = categoryId;
    this.categoryService.getCategory(categoryId).subscribe((category: any) => {
      this.editForm.patchValue(category);
    });
  }

  checkPermission(key: string) {
    return this.authService.evaluatePermissions(key);
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.categoryService.editCategory(this.editForm.value)
        .subscribe(data => {
          this.router.navigate(['/category']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/category']);
  }

  get f() { return this.editForm.controls; }
}
