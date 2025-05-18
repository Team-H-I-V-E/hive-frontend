import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly API_URL = `${environment.apiBaseUrl}/api/auth`;

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    /** 로그인 */
    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(
            `${this.API_URL}/login`,
            { userEmail: email, userPassword: password },
            { withCredentials: true } // ✅ JWT 쿠키 받기
        ).pipe(
            tap(user => this.currentUserSubject.next(user))
        );
    }

    /** 로그아웃 */
    logout(): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => this.currentUserSubject.next(null))
        );
    }

    /** 현재 로그인 유저 정보 조회 */
    getMe(): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/me`, {
            withCredentials: true
        }).pipe(
            tap(user => this.currentUserSubject.next(user))
        );
    }

    /** 현재 로그인 유저 ID 가져오기 */
    getUserIdFromToken(): number | null {
        const user = this.currentUserSubject.getValue();
        return user?.userId ?? null;
    }

    /** 로그인 여부 */
    isLoggedIn(): boolean {
        return !!this.currentUserSubject.getValue();
    }
}