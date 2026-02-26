import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPostById } from '../state/posts.selectors';
import { Posts } from '../../models/posts.model';
import { Subscription } from 'rxjs';
import { updatePostAction } from '../state/posts.action';

@Component({
  selector: 'app-edit-post',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.scss',
})
export class EditPost implements OnInit, OnDestroy {
  // injecti
  private _fb = inject(FormBuilder);
  private _store = inject(Store);

  public form: FormGroup;
  public post: Posts;
  public postSubscription: Subscription;

  ngOnInit(): void {
    this.createForm();
    this.fetchEditDetail();
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  createForm() {
    this.form = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  fetchEditDetail() {
    this.postSubscription = this._store.select(selectPostById()).subscribe((post) => {
      console.log(post, 'data routerstate');
      if (!post) return;
      this.post = post;
      this.setFormValue();
    });
  }

  setFormValue() {
    this.form.patchValue({
      title: this.post.title,
      description: this.post.body,
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const title = this.form.value.title;
    const description = this.form.value.description;

    const post: Posts = {
      id: this.post.id,
      title: title,
      body: description,
      userId: this.post.userId,
    };

    // dispatch the action for update
    this._store.dispatch(updatePostAction({ post }));
  }
}
