import { Component, Input } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { DataFormatterService } from '../../../../../shared/common/services/data-formatter.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-project-overview',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './project-overview.component.html',
})
export class ProjectOverviewComponent {
    @Input() project?: ProjectDataDto;

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}
}
