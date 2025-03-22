import { AfterViewInit, Component, ElementRef, Input, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core';
import { UpdateProjectDto, JobSpecification, ProjectDataDto } from '../../../models/Project';
import { CommonModule } from '@angular/common';
import JSONEditor from "jsoneditor";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpecificationRenderType } from '../../../models/uiTypes';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../../../services/project.service';
import { UISpecificationComponent } from "./uispecification/uispecification.component";

@Component({
  selector: 'app-project-specification',
  imports: [CommonModule, FontAwesomeModule, UISpecificationComponent],
  templateUrl: './project-specification.component.html',
  styleUrl: './project-specification.component.css'
})
export class ProjectSpecificationComponent implements OnChanges, AfterViewInit {
    @Input() project?: ProjectDataDto;
    @ViewChild("jsonEditorContainer") jsonEditorContainer?: ElementRef;

    renderType = signal<SpecificationRenderType>(SpecificationRenderType.UI);
    isEditModeOn = signal(false);
    jsonEditor?: JSONEditor;
    jsonValue?: string;

    updateProjectDto: UpdateProjectDto = {
        id: 0, userId: 0, name: "",
    }

    constructor(
        private readonly projectService: ProjectService,
    ) {}
    
    ngAfterViewInit(): void {
        this.initializeJsonEditor();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["project"] && this.project) {
            this.initializeJsonEditor();
            this.setUpdateProjectDto(this.project);
        }
    }

    private setUpdateProjectDto(project: ProjectDataDto): void {
        this.updateProjectDto.id = project.id;
        this.updateProjectDto.userId = project.userId;
        this.updateProjectDto.name = project.name;
        this.updateProjectDto.description = project.description;
    }
    
    initializeJsonEditor(): void {
        if (this.renderType() !== SpecificationRenderType.JSON || !this.jsonEditorContainer || !this.project) {
            return;
        }

        if (!this.project.jobSpecification) {
            this.project.jobSpecification = {
                appSpecification: {
                    appName: "",
                    functionalSpecifications: ["test"],
                },
                developmentSpecification: {}
            };
        }

        try {
            this.jsonValue = JSON.stringify(this.project.jobSpecification, null, 4);
            this.jsonEditor = new JSONEditor(
                this.jsonEditorContainer.nativeElement,
                { 
                    mode: this.isEditModeOn() ? "code" : "view",
                }
            );
            this.jsonEditor.setText(this.jsonValue);
        } catch (error) {
            console.error("Error initializing JSONEditor:", error);
        }
    }

    selectRenderType(renderType: SpecificationRenderType): void {
        if (this.renderType() === renderType) return;
        
        this.renderType.set(renderType);
        if (renderType === SpecificationRenderType.JSON) {
            setTimeout(() => {
                this.initializeJsonEditor();
            }, 0);
        }
    }

    startEditMode(): void {
        if (this.isEditModeOn()) return;
        this.isEditModeOn.set(true);

        if (!this.jsonEditor) return;
        this.jsonEditor.setMode("code");
    }

    confirmEdit(): void {
        const jobSpecification = this.validateJson();
        if (!jobSpecification) {
            console.error("Invalid job specification");
            return;
        }
        this.updateProjectDto.jobSpecification = jobSpecification;
        this.updateProjectDto.updateSpec = false;

        this.projectService.updateProject(this.updateProjectDto).subscribe({
            next: (data) => {
                console.log("Successful update:", data);
            },
            error: (error) => {
                console.log("Error updating Job Specification:", error);
            }
        })
    }

    private validateJson(): JobSpecification | undefined {
        if (!this.project) return;
        if (!this.isEditModeOn) return;

        this.jsonValue = this.jsonEditor?.getText();
        if (!this.jsonValue) return;
        
        try {
            return JSON.parse(this.jsonValue);
        } catch (e) {
            console.log("Invalid JSON in editor", e);
            return;
        }
    }

    cancelEdit(): void {
        if (!this.isEditModeOn()) return;
        this.isEditModeOn.set(false);

        if (!this.jsonEditor) return;
        try {
            this.jsonValue = JSON.stringify(this.project?.jobSpecification, null, 4);
            this.jsonEditor.setText(this.jsonValue);
            this.jsonEditor.setMode("view");
        } catch (error) {
            console.error("Error initializing JSONEditor:", error);
        }
    }


    SpecificationRenderType = SpecificationRenderType;
    faEdit = faEdit;
    faSave = faSave;
}
