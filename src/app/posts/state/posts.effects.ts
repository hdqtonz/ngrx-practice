import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../services/post.service';
import { loadPostAction, loadPostSuccessAction } from './posts.action';
import { map, mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class postsEffects {
  private actions$ = inject(Actions);
  private _store = inject(Store);
  private postService = inject(PostService);

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
}
