import { Component, Input } from '@angular/core';
import { DeveloperStatus } from '../../../../models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataFormatterService } from '../../../../../../shared/common/services/data-formatter.service';

@Component({
    selector: 'app-developer-status',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './developer-status.component.html',
})
export class DeveloperStatusComponent {
    @Input() status?: DeveloperStatus;

    constructor(private dataFormatterService: DataFormatterService) {}

    DeveloperStatus = DeveloperStatus;

    formatStatus(status?: DeveloperStatus): string {
        if (!status) return '';
        return this.dataFormatterService.formatEnumString(status.toString());
    }
}
