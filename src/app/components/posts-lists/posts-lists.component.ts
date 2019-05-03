import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/post.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-posts-lists',
  templateUrl: './posts-lists.component.html',
  styleUrls: ['./posts-lists.component.scss']
})
export class PostsListsComponent implements OnInit {
  posts: Post[];
  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe( (posts: Post[]) => {
      this.posts = posts;
    });
  }
  checkPermission(key: string) {
    return this.authService.evaluatePermissions(key);
  }

  editPost(postId){
    this.router.navigate(['/edit-post'], { queryParams: { postId: postId } });
  }

  deletePost(postId){
    this.postService.deletePost(postId).subscribe( () => {
      const postIndex = this.posts.findIndex( (post) => post.id === postId);
      this.posts.splice(postIndex, 1);
    });
  }

}
