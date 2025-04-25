import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private readonly API_URL = `${environment.apiBaseUrl}/api/auth`;

    constructor(private http: HttpClient) { }

    /** 현재 로그인한 유저 정보 */
    getMe(): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/me`, {
            withCredentials: true, // 쿠키로 인증
        });
    }
}