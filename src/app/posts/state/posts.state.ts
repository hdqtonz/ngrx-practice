import { Posts } from '../../models/posts.model';

export interface PostsState {
  posts: Posts[];
}

export const initialState: PostsState = {
  posts: null,
};
