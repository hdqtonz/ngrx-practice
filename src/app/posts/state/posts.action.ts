import { createAction, props } from '@ngrx/store';
import { Posts } from '../../models/posts.model';
import { Update } from '@ngrx/entity';

export const ADD_POST_ACTION = '[post page] add post';
export const ADD_POST_SUCCESS_ACTION = '[post page] add post success';

export const UPDATE_POST_ACTION = '[post page] update post';
export const UPDATE_POST_SUCCESS_ACTION = '[post page] update post success';

export const DELETE_POST_ACTION = '[post page] delete post';
export const DELETE_POST_SUCCESS_ACTION = '[post page] delete post success';

export const LOAD_POST_ACTION = '[post page] load posts';
export const LOAD_POST_SUCCESS_ACTION = '[post page] load posts success';

export const addPostAction = createAction(ADD_POST_ACTION, props<{ post: Posts }>());
export const addPostSuccessAction = createAction(ADD_POST_SUCCESS_ACTION, props<{ post: Posts }>());

export const updatePostAction = createAction(UPDATE_POST_ACTION, props<{ post: Posts }>());
export const updatePostSuccessAction = createAction(
  UPDATE_POST_SUCCESS_ACTION,
  props<{ post: Update<Posts> }>(),
);

export const deletePostAction = createAction(DELETE_POST_ACTION, props<{ id: string | number }>());
export const deletePostSuccessAction = createAction(
  DELETE_POST_SUCCESS_ACTION,
  props<{ id: number }>(),
);

export const loadPostAction = createAction(LOAD_POST_ACTION);
export const loadPostSuccessAction = createAction(
  LOAD_POST_SUCCESS_ACTION,
  props<{ posts: Posts[] }>(),
);
