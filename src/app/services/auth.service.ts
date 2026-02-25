import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResult } from '../models/api.response.model';
import { IAuthResponseData } from '../models/auth-response.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  login(email: string, password: string): Observable<IResult<IAuthResponseData>> {
    return this._http.post<IResult<IAuthResponseData>>(`http://localhost:5000/api/v1/auth/login`, {
      email,
      password,
    });
  }

  formatUser(data: IAuthResponseData) {
    const expirationDate = data.accessTokenExpiresAt + 60 * 1000;
    const user = new User(data.email, data.accessToken, expirationDate);

    return user;
  }
}
