import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsAdapter, PostsState } from './posts.state';
import { selectCurrentRoute } from '../../_store/router/router.selector';
import { RouterStateUrl } from '../../_store/router/custom-route-serializer';

export const POST_STATE_NAME = 'posts';

export const selectPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postSelectors = postsAdapter.getSelectors();

export const selectPosts = createSelector(selectPostsState, postSelectors.selectAll);
export const selectPostsEntities = createSelector(selectPostsState, postSelectors.selectEntities);

export const selectPostById = () => {
  return createSelector(selectPostsEntities, selectCurrentRoute, (posts, route: RouterStateUrl) => {
    const id = route?.params['id'];
    return posts ? posts[id] : null;
  });
};

export const selectPostCount = createSelector(selectPostsState, (state) => state.count);
