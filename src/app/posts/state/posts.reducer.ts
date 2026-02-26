import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import {
  addPostSuccessAction,
  deletePostAction,
  deletePostSuccessAction,
  loadPostSuccessAction,
  updatePostAction,
  updatePostSuccessAction,
} from './posts.action';

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccessAction, (state, action) => {
    let post = { ...action.post };

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccessAction, (state, action) => {
    const updatePosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatePosts,
    };
  }),
  on(deletePostSuccessAction, (state, action) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id !== action.id;
    });

    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(loadPostSuccessAction, (state, action) => {
    console.log(action.posts, 'posts reducer');
    return {
      ...state,
      posts: action.posts,
    };
  }),
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
