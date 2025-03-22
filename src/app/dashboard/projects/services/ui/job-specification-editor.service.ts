import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { JobSpecification, ProjectDataDto, UpdateProjectDto } from "../../models/Project";
import { SpecificationRenderType } from "../../models/uiTypes";
import { ProjectService } from "../api/project.service";

@Injectable({
    providedIn: "root"
})
export class JobSpecificationEditorService {
    private jobSpecificationSubject = new BehaviorSubject<JobSpecification | undefined>(undefined);
    jobSpecification$ = this.jobSpecificationSubject.asObservable();
    isEditModeOn = signal(false);
    jsonValue = signal<string | undefined>(undefined);
    jsonStringFromEditor = signal<string | undefined>(undefined);

    private updateProjectDto: UpdateProjectDto = {
        id: 0,
        userId: 0,
        name: '',
    };

    constructor(private readonly projectService: ProjectService) {}

    setProjectData(project: ProjectDataDto): void {
        this.setProjectDto(project);
        this.updateJobSpecification(project.jobSpecification);
    }

    setProjectDto(project: ProjectDataDto): void {
        this.updateProjectDto.id = project.id;
        this.updateProjectDto.userId = project.userId;
        this.updateProjectDto.name = project.name;
        this.updateProjectDto.description = project.description;
    }

    updateJobSpecification(jobSpecification?: JobSpecification): void {
        this.updateJsonValue(jobSpecification);
        this.jobSpecificationSubject.next(jobSpecification);
    }

    private updateJsonValue(jobSpecification?: JobSpecification): void {
        this.jsonValue.set(JSON.stringify(jobSpecification, null, 4));
    }

    startEditMode(): void {
        this.isEditModeOn.set(true);
    }

    confirmEdit(renderType: SpecificationRenderType): Observable<ProjectDataDto> {
        if (renderType === SpecificationRenderType.JSON) {
            return this.handleJSONEdit();
        } else {
            return this.handleUIEdit();
        }
    }

    private handleJSONEdit(): Observable<ProjectDataDto> {
        let jobSpecification: JobSpecification | undefined;
        try {
            jobSpecification = JSON.parse(this.jsonStringFromEditor() || "");
        } catch (error) {
            console.error("Invalid JSON:", error);
            return new Observable<ProjectDataDto>();
        }

        if (!jobSpecification) {
            console.error("Invalid job specification");
            return new Observable<ProjectDataDto>();
        }

        this.updateProjectDto.jobSpecification = jobSpecification;
        this.updateProjectDto.updateSpec = false;

        return this.projectService.updateProject(this.updateProjectDto).pipe(
            tap((data) => {
                this.updateJobSpecification(data.jobSpecification);
                this.isEditModeOn.set(false);
            })
        );
    }

    private handleUIEdit(): Observable<ProjectDataDto> {
        // Implement UI edit logic here
        return new Observable<ProjectDataDto>();
    }

    cancelEdit(project: ProjectDataDto): void {
        this.isEditModeOn.set(false);
        this.setProjectData(project);
    }

    onJsonChange(jsonString: string): void {
        this.jsonStringFromEditor.set(jsonString);
    }
}