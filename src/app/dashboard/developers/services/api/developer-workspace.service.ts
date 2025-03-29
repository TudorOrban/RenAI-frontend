import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../enviroments/environment-dev";
import { Observable } from "rxjs";
import { ReadFileResponseDto, WorkspaceTree } from "../../models/RenaiDeveloper";

@Injectable({
    providedIn: "root"
})
export class DeveloperWorkspaceService {
    private apiUrl = `${environment.apiUrl}/workspace`;

    constructor(
        private readonly http: HttpClient
    ) {}

    getWorkspaceTree(developerId: number, depthLimit?: number): Observable<WorkspaceTree> {
        return this.http.get<WorkspaceTree>(`${this.apiUrl}/${developerId}/tree`, { params: { depthLimit: depthLimit ?? 10 }});
    }

    readFile(developerId: number, filePath: string): Observable<ReadFileResponseDto> {
        return this.http.get<ReadFileResponseDto>(`${this.apiUrl}/${developerId}/file`, { params: { filePath: filePath } });
    }
}