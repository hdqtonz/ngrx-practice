import { Posts } from '../../models/posts.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface PostsState extends EntityState<Posts> {
  count: number;
}

export const postsAdapter = createEntityAdapter<Posts>({
  sortComparer: (a, b) => b.id - a.id,
});

export const initialState: PostsState = postsAdapter.getInitialState({
  count: 0,
});
