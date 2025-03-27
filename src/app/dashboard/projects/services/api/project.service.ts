import { Injectable } from "@angular/core";
import { environment } from "../../../../../enviroments/environment-dev";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateProjectDto, ProjectDataDto, ProjectSearchDto, UpdateProjectDto } from "../../models/Project";
import { PaginatedResults, SearchParams } from "../../../../shared/common/types/searchTypes";

@Injectable({
    providedIn: "root"
})
export class ProjectService {
    private apiUrl = `${environment.apiUrl}/projects`;

    constructor(
        private http: HttpClient
    ) {}

    getProjectsByUserId(userId: number, searchParams: SearchParams): Observable<PaginatedResults<ProjectSearchDto>> {
        return this.http.get<PaginatedResults<ProjectSearchDto>>(`${this.apiUrl}/user/${userId}`, { params: { ...searchParams } });
    }

    getProject(id: number, includeDevelopers?: boolean): Observable<ProjectDataDto> {
        return this.http.get<ProjectDataDto>(`${this.apiUrl}/${id}`, { params: { includeDevelopers: includeDevelopers ?? false } });
    }

    createProject(projectDto: CreateProjectDto): Observable<ProjectDataDto> {
        return this.http.post<ProjectDataDto>(this.apiUrl, projectDto);
    }

    updateProject(projectDto: UpdateProjectDto): Observable<ProjectDataDto> {
        return this.http.put<ProjectDataDto>(this.apiUrl, projectDto);
    }

    deleteProject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    
}