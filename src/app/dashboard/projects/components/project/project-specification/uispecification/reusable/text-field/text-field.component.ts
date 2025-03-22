import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JobSpecificationStateService } from '../../../../../../services/ui/job-specification-state.service';
import { JobSpecificationUpdaterService } from '../../../../../../services/ui/field-updater.service';

@Component({
    selector: 'app-text-field',
    imports: [CommonModule, FormsModule],
    templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
    @Input() label!: string;
    @Input() value?: string;
    @Input() fieldId?: string;
    @Input() itemIndex?: number; 

    constructor(
        private readonly stateService: JobSpecificationStateService,
        private readonly updaterService: JobSpecificationUpdaterService,
    ) {}

    getIsEditModeOn(): boolean {
        return this.stateService.isEditModeOn;
    }

    updateValue(newValue: string | undefined): void {
        if (this.fieldId && newValue !== undefined) {
            this.updaterService.updateField(this.fieldId, newValue, this.itemIndex);
        }
    }
}
