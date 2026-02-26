import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import { Observable } from 'rxjs';
import { Posts } from '../../models/posts.model';
import { selectPostCount, selectPosts } from '../state/posts.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { deletePostAction, loadPostAction } from '../state/posts.action';

@Component({
  selector: 'app-posts-list',
  imports: [AsyncPipe, RouterLink, RouterOutlet],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.scss',
})
export class PostsList implements OnInit {
  // injection
  private _store = inject(Store<AppState>);

  // var
  public posts$: Observable<Posts[]>;
  public count$: Observable<number>;

  ngOnInit(): void {
    this._store.dispatch(loadPostAction());
    this.posts$ = this._store.select(selectPosts);
    this.count$ = this._store.select(selectPostCount);
  }

  onDeletePost(id: number) {
    if (confirm('Are you sure you want to delete the post')) {
      this._store.dispatch(deletePostAction({ id }));
    }
  }
}
