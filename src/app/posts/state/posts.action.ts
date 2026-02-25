import { createAction, props } from '@ngrx/store';
import { Posts } from '../../models/posts.model';

export const Add_POST_ACTION = '[post page] add post';
export const UPDATE_POST_ACTION = '[post page] update post';
export const DELETE_POST_ACTION = '[post page] delete post';

export const addPostAction = createAction(Add_POST_ACTION, props<{ post: Posts }>());

export const updatePostAction = createAction(UPDATE_POST_ACTION, props<{ post: Posts }>());

export const deletePostAction = createAction(DELETE_POST_ACTION, props<{ id: string }>());
