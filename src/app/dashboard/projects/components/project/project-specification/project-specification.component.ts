import { Component, ElementRef, Input, OnChanges, signal, SimpleChanges, ViewChild } from '@angular/core';
import { JobSpecification, ProjectDataDto } from '../../../models/Project';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpecificationRenderType } from '../../../models/uiTypes';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { UISpecificationComponent } from "./uispecification/uispecification.component";
import { JsonEditorComponent } from "./json-editor/json-editor.component";
import { JobSpecificationEditorService } from '../../../services/ui/job-specification-editor.service';

@Component({
    selector: 'app-project-specification',
    imports: [CommonModule, FontAwesomeModule, UISpecificationComponent, JsonEditorComponent],
    templateUrl: './project-specification.component.html',
})
export class ProjectSpecificationComponent implements OnChanges {
    @Input() project?: ProjectDataDto;
    @ViewChild("jsonEditorContainer") jsonEditorContainer?: ElementRef;

    jobSpecification?: JobSpecification;
    renderType = signal<SpecificationRenderType>(SpecificationRenderType.UI);

    constructor(
        readonly editorService: JobSpecificationEditorService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['project'] && this.project) {
            this.editorService.setProjectData(this.project);
            this.editorService.jobSpecification$.subscribe((jobSpecification) => {
                this.jobSpecification = jobSpecification;
            });
        }
    }

    selectRenderType(renderType: SpecificationRenderType): void {
        if (this.renderType() === renderType) return;
        if (this.isEditModeOn()) return;
        this.renderType.set(renderType);
    }
    
    isEditModeOn(): boolean {
        return this.editorService.isEditModeOn();
    }

    startEditMode(): void {
        this.editorService.startEditMode();
    }

    confirmEdit(): void {
        this.editorService.confirmEdit(this.renderType()).subscribe({
            next: () => {},
            error: (error) => {
                console.log('Error updating Job Specification:', error);
            },
        });
    }

    cancelEdit(): void {
        this.editorService.cancelEdit(this.project as ProjectDataDto);
    }

    SpecificationRenderType = SpecificationRenderType;
    faEdit = faEdit;
    faSave = faSave;
}
