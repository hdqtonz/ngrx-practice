import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Posts } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // inject
  private _http = inject(HttpClient);

  /**
   * Fetch Posts List from fake api
   * @returns
   */
  fetchPosts(): Observable<Posts[]> {
    return this._http.get<Posts[]>(`https://jsonplaceholder.typicode.com/posts`).pipe(
      map((data) => {
        return data.map((item) => ({ id: item.id, title: item.title, body: item.body }));
      }),
    );
  }

  addPost(post: Posts): Observable<Posts> {
    return this._http.post<Posts>(`https://jsonplaceholder.typicode.com/posts`, post).pipe(
      map((data) => {
        return { id: data.id, title: data.title, body: data.body };
      }),
    );
  }

  updatePost(post: Posts): Observable<Posts> {
    return this._http
      .put<Posts>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
      .pipe(
        map((data) => {
          return { id: data.id, title: data.title, body: data.body };
        }),
      );
  }

  deletePost(id: number | string): Observable<any> {
    return this._http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  fetchPostById(id: number | string): Observable<any> {
    return this._http.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
