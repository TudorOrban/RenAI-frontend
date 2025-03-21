import { Component, Input } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpecificationRenderType } from '../../../models/uiTypes';

@Component({
  selector: 'app-project-specification',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './project-specification.component.html',
  styleUrl: './project-specification.component.css'
})
export class ProjectSpecificationComponent {
    @Input() project?: ProjectDataDto;
    @Input() renderType?: SpecificationRenderType;
}
