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
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ROUTER_NAVIGATION, RouterNavigatedAction } from '@ngrx/router-store';
import { Update } from '@ngrx/entity';
import { Posts } from '../../models/posts.model';
import { selectPostById, selectPosts } from './posts.selectors';
import { dummyAction } from '../../auth/state/auth.actions';

@Injectable()
export class postsEffects {
  private actions$ = inject(Actions);
  private _store = inject(Store);
  private postService = inject(PostService);
  private _router = inject(Router);

  loadPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPostAction),
      withLatestFrom(this._store.select(selectPosts)),
      mergeMap(([action, posts]) => {
        if (posts.length && posts.length > 1) {
          return of(dummyAction());
        }
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

            const updatedPost: Update<Posts> = {
              id: post.id,
              changes: {
                ...action.post,
              },
            };
            return updatePostSuccessAction({ post: updatedPost });
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
            return deletePostSuccessAction({ id: Number(action.id) });
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
      withLatestFrom(this._store.select(selectPosts)),
      switchMap(([id, posts]) => {
        if (posts.length) {
          return of(dummyAction());
        }
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
