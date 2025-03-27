import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { JobSpecification, ProjectDataDto, UpdateProjectDto } from "../../models/Project";
import { SpecificationRenderType } from "../../models/uiTypes";
import { ProjectService } from "../api/project.service";
import { JobSpecificationStateService } from "./job-specification-state.service";

@Injectable({
    providedIn: "root"
})
export class JobSpecificationEditorService {
    private updateProjectDto: UpdateProjectDto = {
        id: 0,
        userId: 0,
        name: '',
    };

    constructor(
        private readonly projectService: ProjectService,
        private readonly stateService: JobSpecificationStateService,
    ) {}

    setProjectData(project: ProjectDataDto): void {
        this.setProjectDto(project);
        console.log("Spec", project.jobSpecification?.appSpecification?.appName);
        this.stateService.setEditedSpecification(this.deepCopy(project.jobSpecification));
        this.updateJsonValue(project.jobSpecification);
    }

    private deepCopy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    setProjectDto(project: ProjectDataDto): void {
        this.updateProjectDto.id = project.id;
        this.updateProjectDto.userId = project.userId;
        this.updateProjectDto.name = project.name;
        this.updateProjectDto.description = project.description;
    }

    private updateJsonValue(jobSpecification?: JobSpecification): void {
        this.stateService.setJsonValue(JSON.stringify(jobSpecification, null, 4));
    }

    startEditMode(): void {
        this.stateService.setIsEditModeOn(true);
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
            jobSpecification = JSON.parse(this.stateService.jsonStringFromEditor ?? "");
        } catch (error) {
            console.error("Invalid JSON:", error);
            return new Observable<ProjectDataDto>();
        }

        if (!jobSpecification) {
            console.error("Invalid job specification");
            return new Observable<ProjectDataDto>();
        }

        this.updateProjectDto.jobSpecification = jobSpecification;
        this.updateProjectDto.updateSpec = true;

        return this.projectService.updateProject(this.updateProjectDto).pipe(
            tap((data) => {
                this.handleSuccessfulUpdate(data);
            })
        );
    }

    private handleUIEdit(): Observable<ProjectDataDto> {
        this.updateProjectDto.jobSpecification = this.stateService.editedSpecification;
        this.updateProjectDto.updateSpec = true;

        return this.projectService.updateProject(this.updateProjectDto).pipe(
            tap((data) => {
                this.handleSuccessfulUpdate(data);
            })
        );
    }

    private handleSuccessfulUpdate(updatedProject: ProjectDataDto): void {
        this.stateService.setEditedSpecification(updatedProject.jobSpecification);
        this.stateService.setIsEditModeOn(false);
        this.updateJsonValue(updatedProject.jobSpecification);
    }

    cancelEdit(project?: ProjectDataDto): void {
        this.stateService.setIsEditModeOn(false);
        if (!project) return;
        this.setProjectData(project);
    }

    onJsonChange(jsonString: string): void {
        this.stateService.setJsonValue(jsonString);
        this.stateService.setJsonStringFromEditor(jsonString);
    }
}