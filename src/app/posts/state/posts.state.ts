import { Posts } from '../../models/posts.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface PostsState extends EntityState<Posts> {}

export const postsAdapter = createEntityAdapter<Posts>();

export const initialState: PostsState = postsAdapter.getInitialState();
