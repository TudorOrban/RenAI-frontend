import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeveloperStatus, RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';
import { RenaiDeveloperService } from '../../../services/api/renai-developer.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeveloperStatusComponent } from "../../../../projects/components/project/developers/developer-status/developer-status.component";
import { faArrowLeftRotate, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastManagerService } from '../../../../../shared/common/services/toast-manager.service';
import { ToastType } from '../../../../../shared/types/uiTypes';

@Component({
    selector: 'app-developers-list',
    imports: [CommonModule, FontAwesomeModule, DeveloperStatusComponent],
    templateUrl: './developers-list.component.html',
})
export class DevelopersListComponent {
    @Input() developers?: RenaiDeveloperSearchDto[];
    @Output() onDeveloperReload = new EventEmitter<void>();

    constructor(
        private readonly developerService: RenaiDeveloperService,
        private readonly toastService: ToastManagerService,
        private readonly router: Router
    ) {}

    navigateTo(developerId: number): void {
        this.router.navigate([`dashboard/developers/${developerId}`]);
    }

    pauseDeveloper(event: Event, developerId: number): void {
        event.stopPropagation();

        this.developerService.pauseDeveloper(developerId).subscribe({
            next: (data) => {
                this.toastService.addToast({ title: "Success", details: "Developer paused successfully.", type: ToastType.SUCCESS });
                this.reloadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
                this.toastService.addToast({ title: "Error", details: "Failed to pause developer.", type: ToastType.ERROR });
            }
        })
    }

    resumeDeveloper(event: Event, developerId: number): void {
        event.stopPropagation();

        this.developerService.resumeDeveloper(developerId).subscribe({
            next: (data) => {
                this.toastService.addToast({ title: "Success", details: "Developer paused successfully.", type: ToastType.SUCCESS });
                this.reloadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
                this.toastService.addToast({ title: "Error", details: "Failed to pause developer.", type: ToastType.ERROR });
            }
        })
    }

    stopDeveloper(event: Event, developerId: number): void {
        event.stopPropagation();

        this.developerService.stopDeveloper(developerId).subscribe({
            next: (data) => {
                this.toastService.addToast({ title: "Success", details: "Developer paused successfully.", type: ToastType.SUCCESS });
                this.reloadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
                this.toastService.addToast({ title: "Error", details: "Failed to pause developer.", type: ToastType.ERROR });
            }
        })
    }

    private reloadDevelopers(): void {
        this.onDeveloperReload.emit();
    }

    DeveloperStatus = DeveloperStatus;
    faArrowLeftRotate = faArrowLeftRotate;
    faPlay = faPlay;
    faPause = faPause;
    faStop = faStop;
}
