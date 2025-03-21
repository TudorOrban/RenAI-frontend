import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../../enviroments/environment-dev";
import { UserDataDto } from "../models/User";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private currentUserSubject = new BehaviorSubject<UserDataDto | null>(null);
}