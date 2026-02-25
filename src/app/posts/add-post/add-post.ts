import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addPostAction } from '../state/posts.action';
import { Posts } from '../../models/posts.model';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.scss',
})
export class AddPost implements OnInit {
  // inject
  private _fb = inject(FormBuilder);
  private _store = inject(Store);

  public form: FormGroup;

  ngOnInit(): void {
    this.form = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const post: Posts = {
      title: this.form.value.title,
      body: this.form.value.description,
    };

    this._store.dispatch(addPostAction({ post }));
    this.form.reset();
  }
}
