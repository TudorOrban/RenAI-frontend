import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../../enviroments/environment-dev";
import { UserDataDto } from "../models/User";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserSubject = new BehaviorSubject<UserDataDto | null>(null);

    constructor(
        private http: HttpClient
    ) {}


    setCurrentUser(user: UserDataDto | null): void {
        this.currentUserSubject.next(user);
    }

    getCurrentUser(): Observable<UserDataDto | null> {
        return this.currentUserSubject.asObservable();
    }
}