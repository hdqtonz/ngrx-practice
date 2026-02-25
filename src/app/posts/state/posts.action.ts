import { createAction, props } from '@ngrx/store';
import { Posts } from '../../models/posts.model';

export const Add_POST_ACTION = '[post page] add post';
export const UPDATE_POST_ACTION = '[post page] update post';
export const DELETE_POST_ACTION = '[post page] delete post';
export const LOAD_POST_ACTION = '[post page] load posts';
export const LOAD_POST_SUCCESS_ACTION = '[post page] load posts success';

export const addPostAction = createAction(Add_POST_ACTION, props<{ post: Posts }>());

export const updatePostAction = createAction(UPDATE_POST_ACTION, props<{ post: Posts }>());

export const deletePostAction = createAction(DELETE_POST_ACTION, props<{ id: string | number }>());

export const loadPostAction = createAction(LOAD_POST_ACTION);
export const loadPostSuccessAction = createAction(
  LOAD_POST_SUCCESS_ACTION,
  props<{ posts: Posts[] }>(),
);
