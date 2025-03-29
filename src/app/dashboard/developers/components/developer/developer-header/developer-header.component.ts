import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { DeveloperLifecycleManagerComponent } from './developer-lifecycle-manager/developer-lifecycle-manager.component';

@Component({
    selector: 'app-developer-header',
    imports: [FontAwesomeModule, DeveloperLifecycleManagerComponent],
    templateUrl: './developer-header.component.html',
})
export class DeveloperHeaderComponent {
    @Input() developer?: RenaiDeveloperSearchDto;
    @Output() onDeveloperReload = new EventEmitter<void>();

    handleReloadDeveloper(): void {
        this.onDeveloperReload.emit();
    }

    faEllipsis = faEllipsis;
}
