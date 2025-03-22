import { Component, Input } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-project-header',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './project-header.component.html',
})
export class ProjectHeaderComponent {
    @Input() project?: ProjectDataDto;
    


    faEllipsis = faEllipsis;
}
