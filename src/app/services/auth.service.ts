import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResult } from '../models/api.response.model';
import { IAuthResponseData } from '../models/auth-response.model';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);

  private refreshTimer: any;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  login(email: string, password: string): Observable<IResult<IAuthResponseData>> {
    return this._http.post<IResult<IAuthResponseData>>(
      `http://localhost:5000/api/v1/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
  }

  signup(name: string, email: string, password: string): Observable<IResult> {
    return this._http.post<IResult>(`http://localhost:5000/api/v1/auth/register`, {
      name,
      email,
      password,
    });
  }

  refreshToken(): Observable<IResult<IAuthResponseData>> {
    return this._http.get<IResult<IAuthResponseData>>('http://localhost:5000/api/v1/auth/refresh', {
      withCredentials: true,
    });
  }

  apiLogout(): Observable<IResult<any>> {
    return this._http.get<IResult<IAuthResponseData>>('http://localhost:5000/api/v1/auth/logout', {
      withCredentials: true,
    });
  }

  formatUser(data: IAuthResponseData) {
    const expirationDate = data.accessTokenExpiresAt - 60 * 1000;
    const user = new User(data.email, data.accessToken, expirationDate);

    return user;
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.scheduleRefresh(user.expireAt);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new User(userData.email, userData.token, userData.tokenExpiresAt);

      this.scheduleRefresh(userData.tokenExpiresAt);

      return user;
    }
    return null;
  }

  /* ---------------- AUTO REFRESH ---------------- */

  private scheduleRefresh(expireAt: number) {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    const timeLeft = expireAt - Date.now();

    this.refreshTimer = setTimeout(() => {
      this.tryRefresh();
    }, timeLeft);
  }

  private tryRefresh() {
    this.refreshToken()
      .pipe(
        tap((res) => {
          const user = this.formatUser(res.data);
          this.setUserInLocalStorage(user);
        }),
        catchError(() => {
          this.logout();
          return EMPTY;
        }),
      )
      .subscribe();
  }

  /* ---------------- LOGOUT ---------------- */

  logout() {
    this.apiLogout().subscribe({
      next: () => {
        localStorage.removeItem('userData');
        this.currentUser$.next(null);
      },
    });

    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }
}
