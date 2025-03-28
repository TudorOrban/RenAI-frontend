import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/environment-dev";
import { Observable } from "rxjs";
import { RenaiDeveloperSearchDto, TaskState } from "../models/RenaiDeveloper";

@Injectable({
    providedIn: "root"
})
export class RenaiDeveloperService {
    private apiUrl = `${environment.apiUrl}/renai-developers`;

    constructor(
        private readonly http: HttpClient
    ) {}

    getDevelopersByProjectId(projectId: number): Observable<RenaiDeveloperSearchDto[]> {
        return this.http.get<RenaiDeveloperSearchDto[]>(`${this.apiUrl}/project/${projectId}`);
    }

    getDeveloperId(id: number): Observable<RenaiDeveloperSearchDto> {
        return this.http.get<RenaiDeveloperSearchDto>(`${this.apiUrl}/${id}`);
    }

    // Lifecycle
    getState(id: number): Observable<TaskState> {
        return this.http.get<TaskState>(`${this.apiUrl}/${id}`);
    }

    pauseDeveloper(id: number): Observable<string> {
        return this.http.put<string>(`${this.apiUrl}/${id}/pause`, null);
    }

    resumeDeveloper(id: number): Observable<string> {
        return this.http.put<string>(`${this.apiUrl}/${id}/resume`, null);
    }

    stopDeveloper(id: number): Observable<string> {
        return this.http.put<string>(`${this.apiUrl}/${id}/stop`, null);
    }
}