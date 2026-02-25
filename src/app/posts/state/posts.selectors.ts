import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const POST_STATE_NAME = 'posts';

export const selectPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const selectPosts = createSelector(selectPostsState, (state) => {
  return state.posts;
});

export const selectPostById = (id: string) => {
  return createSelector(selectPostsState, (state) => {
    return state.posts.find((e) => e.id == id);
  });
};
