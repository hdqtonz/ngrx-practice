import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { selectCurrentRoute } from '../../_store/router/router.selector';
import { RouterStateUrl } from '../../_store/router/custom-route-serializer';

export const POST_STATE_NAME = 'posts';

export const selectPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const selectPosts = createSelector(selectPostsState, (state) => {
  return state.posts;
});

export const selectPostById = () => {
  return createSelector(selectPostsState, selectCurrentRoute, (state, route: RouterStateUrl) => {
    const id = Number(route?.params['id']);
    return state.posts ? state?.posts?.find((e) => e.id == id) : null;
  });
};
