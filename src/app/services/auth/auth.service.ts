import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiBaseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    signin(userEmail: string, userPassword: string ): Observable<any> {
        return this.http.post(`${this.apiBaseUrl}/auth/signin`, { 
            userEmail, 
            userPassword 
        }, {
            withCredentials: true
        });
    }

    signup(userEmail: string, userPassword: string, nickname: string): Observable<any> {
        return this.http.post(`${this.apiBaseUrl}/auth/signup`, { userEmail, userPassword, nickname });
    }
}