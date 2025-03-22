import { Component, effect, Input, signal } from '@angular/core';
import { JobSpecification } from '../../../../models/Project';
import { DataFormatterService } from '../../../../../../shared/common/services/data-formatter.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { JobSpecificationEditorService } from '../../../../services/ui/job-specification-editor.service';

@Component({
    selector: 'app-uispecification',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './uispecification.component.html',
})
export class UISpecificationComponent {
    @Input() jobSpecification?: JobSpecification;
    isEditModeOn = signal(false);

    isAppSpecExpanded = signal(false);
    isBackendStackExpanded = signal(true);
    isFrontendStackExpanded = signal(true);
    isDevelopmentSpecExpanded = signal(true);
    isCostSpeedSpecExpanded = signal(true);
    isInfrastructureSpecExpanded = signal(true);
    isDeveloperZooSpecExpanded = signal(true);

    constructor(
        private readonly editorService: JobSpecificationEditorService,
        readonly dataFormatterService: DataFormatterService
    ) {
        effect(() => {
            this.isEditModeOn.set(this.editorService.isEditModeOn());
        });
    }


    toggleAppSpecExpanded(): void {
        this.isAppSpecExpanded.update(value => !value);
    }

    toggleBackendStackExpanded(): void {
        this.isBackendStackExpanded.update(value => !value);
    }

    toggleFrontendStackExpanded(): void {
      this.isFrontendStackExpanded.update(value => !value);
    }

    toggleDevelopmentSpecExpanded(): void {
        this.isDevelopmentSpecExpanded.update(value => !value);
    }

    toggleCostSpeedSpecExpanded(): void {
        this.isCostSpeedSpecExpanded.update(value => !value);
    }

    toggleInfrastructureSpecExpanded(): void {
        this.isInfrastructureSpecExpanded.update(value => !value);
    }

    toggleDeveloperZooSpecExpanded(): void {
        this.isDeveloperZooSpecExpanded.update(value => !value);
    }
    
    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;
}
