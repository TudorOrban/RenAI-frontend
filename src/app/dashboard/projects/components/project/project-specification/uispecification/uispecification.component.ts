import { Component, effect, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { SectionHeaderComponent } from "./reusable/section-header/section-header.component";
import { TextFieldComponent } from "./reusable/text-field/text-field.component";
import { ArrayFieldComponent } from "./reusable/array-field/array-field.component";
import { EnumFieldComponent } from "./reusable/enum-field/enum-field.component";
import { JobSpecification } from '../../../../models/Project';
import { SpecificationFormatterService } from '../../../../services/ui/specification-formatter.service';
import { JobSpecificationStateService } from '../../../../services/ui/job-specification-state.service';

@Component({
    selector: 'app-uispecification',
    imports: [CommonModule, FontAwesomeModule, SectionHeaderComponent, TextFieldComponent, ArrayFieldComponent, EnumFieldComponent],
    templateUrl: './uispecification.component.html',
})
export class UISpecificationComponent {
    @Input() jobSpecification?: JobSpecification;
    isEditModeOn = signal(false);
    
    constructor(
        private readonly stateService: JobSpecificationStateService,
        readonly specFormatterService: SpecificationFormatterService,
    ) {    
        effect(() => {
            this.isEditModeOn.set(this.stateService.isEditModeOn);
        });
    }


    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;
}
