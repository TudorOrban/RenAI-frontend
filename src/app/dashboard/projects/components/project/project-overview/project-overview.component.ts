import { Component, Input, signal } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { DataFormatterService } from '../../../../../shared/common/services/data-formatter.service';
import { ProjectSpecificationComponent } from "../project-specification/project-specification.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { SpecificationRenderType } from '../../../models/uiTypes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-overview',
  imports: [CommonModule, FontAwesomeModule, ProjectSpecificationComponent],
  templateUrl: './project-overview.component.html',
  styleUrl: './project-overview.component.css'
})
export class ProjectOverviewComponent {
    @Input() project?: ProjectDataDto;

    renderType = signal<SpecificationRenderType>(SpecificationRenderType.UI);

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}

    selectRenderType(renderType: SpecificationRenderType): void {
        this.renderType.set(renderType);
    }

    faEdit = faEdit;
    SpecificationRenderType = SpecificationRenderType;
}
