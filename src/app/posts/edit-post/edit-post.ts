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
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _store = inject(Store);

  public form: FormGroup;
  public post: Posts;
  public postId: number;
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
    // get post id
    this._route.paramMap.subscribe((params) => {
      this.postId = Number(params.get('id'));

      this.postSubscription = this._store.select(selectPostById(this.postId)).subscribe((data) => {
        if (!data) return;

        this.post = data;
        this.setFormValue();
        console.log(this.post, 'this.post');
      });
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

    console.log(this.form.value);
    const title = this.form.value.title;
    const description = this.form.value.description;

    const post: Posts = {
      id: this.postId,
      title: title,
      body: description,
    };

    // dispatch the action for update
    this._store.dispatch(updatePostAction({ post }));
    this._router.navigate(['posts']);
  }
}
