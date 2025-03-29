import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DeveloperLifecycleManagerComponent } from "../../developer/developer-header/developer-lifecycle-manager/developer-lifecycle-manager.component";

@Component({
    selector: 'app-developers-list',
    imports: [CommonModule, FontAwesomeModule, DeveloperLifecycleManagerComponent],
    templateUrl: './developers-list.component.html',
})
export class DevelopersListComponent {
    @Input() developers?: RenaiDeveloperSearchDto[];
    @Output() onDeveloperReload = new EventEmitter<void>();

    constructor(
        private readonly router: Router
    ) {}

    navigateTo(developerId: number): void {
        this.router.navigate([`dashboard/developers/${developerId}`]);
    }

    handleDeveloperReload(): void {
        this.onDeveloperReload.emit();
    }

    faArrowLeftRotate = faArrowLeftRotate;
}
