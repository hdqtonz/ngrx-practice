import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPostAction, deletePostAction, updatePostAction } from './posts.action';

const _postsReducer = createReducer(
  initialState,
  on(addPostAction, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostAction, (state, action) => {
    const updatePosts = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatePosts,
    };
  }),
  on(deletePostAction, (state, action) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id !== action.id;
    });

    return {
      ...state,
      posts: updatedPost,
    };
  }),
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}
