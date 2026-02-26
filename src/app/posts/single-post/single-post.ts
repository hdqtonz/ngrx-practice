import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Posts } from '../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import { selectPostById } from '../state/posts.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-single-post',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './single-post.html',
  styleUrl: './single-post.scss',
})
export class SinglePost implements OnInit {
  // inject
  private _store = inject(Store<AppState>);
  // var
  public post: Observable<Posts>;

  ngOnInit(): void {
    this.post = this._store.select(selectPostById());
  }
}
