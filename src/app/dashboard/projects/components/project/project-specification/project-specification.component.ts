import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpecificationRenderType } from '../../../models/uiTypes';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { UISpecificationComponent } from "./uispecification/uispecification.component";
import { JsonEditorComponent } from "./json-editor/json-editor.component";
import { JobSpecificationEditorService } from '../../../services/ui/job-specification-editor.service';
import { JobSpecificationStateService } from '../../../services/ui/job-specification-state.service';
import { ToastManagerService } from '../../../../../shared/common/services/toast-manager.service';
import { ToastType } from '../../../../../shared/types/uiTypes';

@Component({
    selector: 'app-project-specification',
    imports: [CommonModule, FontAwesomeModule, UISpecificationComponent, JsonEditorComponent],
    templateUrl: './project-specification.component.html',
})
export class ProjectSpecificationComponent implements OnChanges {
    @Input() project?: ProjectDataDto;
    @ViewChild("jsonEditorContainer") jsonEditorContainer?: ElementRef;

    constructor(
        private readonly stateService: JobSpecificationStateService,
        readonly editorService: JobSpecificationEditorService,
        private readonly toastService: ToastManagerService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['project'] && this.project) {
            this.editorService.setProjectData(this.project);
        }
    }

    selectRenderType(renderType: SpecificationRenderType): void {
        this.stateService.setRenderType(renderType);
    }

    getRenderType(): SpecificationRenderType {
        return this.stateService.renderType;
    }
    
    isEditModeOn(): boolean {
        return this.stateService.isEditModeOn;
    }

    confirmEdit(): void {
        this.editorService.confirmEdit(this.stateService.renderType).subscribe({
            next: (data) => {
                this.toastService.addToast({ title: "Success", details: "Project updated successfully.", type: ToastType.SUCCESS });
            },
            error: (error) => {
                this.toastService.addToast({ title: "Error", details: "An error occurred saving the changes. Please try again later.", type: ToastType.ERROR });
            },
        });
    }

    cancelEdit(): void {
        this.editorService.cancelEdit(this.project);
    }

    SpecificationRenderType = SpecificationRenderType;
    faEdit = faEdit;
    faSave = faSave;
}
