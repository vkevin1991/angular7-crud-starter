import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../category.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories : any;
  constructor(private categoryService: CategoryService, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.categoryService.getCategories().subscribe((categories: any) => {
      this.categories = categories;
    });
  }
  editCategory(categoryId){
    this.router.navigate([`/category/${categoryId}`]);
  }
  checkPermission(key: string) {
    return this.authService.evaluatePermissions(key);
  }
  deleteCategory(categoryId){
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      const categoryIndex = this.categories.findIndex((category) => category.id === categoryId);
      this.categories.splice(categoryIndex, 1);
    });
  }

}
