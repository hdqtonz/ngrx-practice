import { createReducer, on } from '@ngrx/store';
import { initialState, postsAdapter } from './posts.state';
import {
  addPostSuccessAction,
  deletePostSuccessAction,
  loadPostSuccessAction,
  updatePostSuccessAction,
} from './posts.action';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccessAction, (state, action) => {
    return postsAdapter.addOne(action.post, state);
  }),
  on(updatePostSuccessAction, (state, action) => {
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccessAction, (state, { id }) => {
    return postsAdapter.removeOne(id, state);
  }),
  on(loadPostSuccessAction, (state, action) => {
    return postsAdapter.setAll(action.posts, state);
  }),
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
