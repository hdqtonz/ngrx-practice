import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsList } from './posts-list/posts-list';
import { AddPost } from './add-post/add-post';
import { EditPost } from './edit-post/edit-post';
import { provideState, StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selectors';

const routes: Routes = [
  {
    path: '',
    component: PostsList,
    providers: [provideState(POST_STATE_NAME, postsReducer)],
    children: [
      { path: 'add', component: AddPost },
      { path: 'edit/:id', component: EditPost },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PostsModule {}
