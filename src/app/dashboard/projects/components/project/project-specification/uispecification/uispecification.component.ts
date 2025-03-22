import { Component, effect, Input, OnInit, signal } from '@angular/core';
import { JobSpecification } from '../../../../models/Project';
import { DataFormatterService } from '../../../../../../shared/common/services/data-formatter.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { JobSpecificationEditorService } from '../../../../services/ui/job-specification-editor.service';
import { SpecificationConfigService } from '../../../../services/ui/specification-config.service';
import { SectionConfig } from '../../../../models/uiTypes';
import { SectionHeaderComponent } from "./reusable/section-header/section-header.component";
import { TextFieldComponent } from "./reusable/text-field/text-field.component";
import { ArrayFieldComponent } from "./reusable/array-field/array-field.component";

@Component({
    selector: 'app-uispecification',
    imports: [CommonModule, FontAwesomeModule, SectionHeaderComponent, TextFieldComponent, ArrayFieldComponent],
    templateUrl: './uispecification.component.html',
})
export class UISpecificationComponent implements OnInit {
    @Input() jobSpecification?: JobSpecification;
    isEditModeOn = signal(false);

    appSpecConfig!: SectionConfig;
    devSpecConfig!: SectionConfig;
    backendStackConfig!: SectionConfig;
    frontendStackConfig!: SectionConfig;
    
    constructor(
        private readonly editorService: JobSpecificationEditorService,
        private readonly configService: SpecificationConfigService,
        readonly dataFormatterService: DataFormatterService
    ) {    

        effect(() => {
            this.isEditModeOn.set(this.editorService.isEditModeOn());
        });
    }

    ngOnInit(): void {
        this.appSpecConfig = this.configService.getAppSpecificationConfig();
        this.devSpecConfig = this.configService.getDevelopmentSpecificationConfig();
        this.backendStackConfig = this.configService.getBackendStackConfig();
        this.frontendStackConfig = this.configService.getFrontendStackConfig();
    }

    getNestedValue(obj: any, key: string): any {
        if (!obj) return undefined;
        if (key in obj) {
            return obj[key];
        }
        return undefined;
    }

    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;
}
