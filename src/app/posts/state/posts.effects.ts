import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/post.service';
import {
  addPostAction,
  addPostSuccessAction,
  deletePostAction,
  deletePostSuccessAction,
  loadPostAction,
  loadPostSuccessAction,
  updatePostAction,
  updatePostSuccessAction,
} from './posts.action';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';

@Injectable()
export class postsEffects {
  private actions$ = inject(Actions);
  private _store = inject(Store);
  private postService = inject(PostService);
  private _router = inject(Router);

  loadPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPostAction),
      mergeMap((action) => {
        return this.postService.fetchPosts().pipe(
          map((posts) => {
            console.log(posts, 'posts effect');
            return loadPostSuccessAction({ posts });
          }),
        );
      }),
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPostAction),
      mergeMap((action) => {
        return this.postService.addPost(action.post).pipe(
          map((post) => {
            console.log(post, 'add post effect');
            return addPostSuccessAction({ post });
          }),
        );
      }),
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePostAction),
      mergeMap((action) => {
        return this.postService.updatePost(action.post).pipe(
          map((post) => {
            console.log(post, 'update post effect');
            return updatePostSuccessAction({ post });
          }),
        );
      }),
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePostAction),
      mergeMap((action) => {
        return this.postService.deletePost(action.id).pipe(
          map(() => {
            console.log(action.id, 'delete post effect');
            return deletePostSuccessAction({ id: action.id });
          }),
        );
      }),
    );
  });

  updateSuccessRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updatePostSuccessAction),
        map((action) => {
          console.log(action.post, 'update post success effect');
          this._router.navigate(['posts']);
        }),
      );
    },
    { dispatch: false },
  );

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/posts/details');
      }),
      map((r: RouterNavigatedAction) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.postService.fetchPostById(id).pipe(
          map((post) => {
            const postData = [{ ...post, id }];
            return loadPostSuccessAction({ posts: postData });
          }),
        );
      }),
    );
  });
}
