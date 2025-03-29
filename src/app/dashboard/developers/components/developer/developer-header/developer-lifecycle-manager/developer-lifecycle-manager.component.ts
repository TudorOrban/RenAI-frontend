import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeveloperStatusComponent } from "../developer-status/developer-status.component";
import { DeveloperStatus, RenaiDeveloperSearchDto } from '../../../../models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RenaiDeveloperService } from '../../../../services/api/renai-developer.service';
import { ToastManagerService } from '../../../../../../shared/common/services/toast-manager.service';
import { Router } from '@angular/router';
import { ToastType } from '../../../../../../shared/types/uiTypes';
import { faArrowLeftRotate, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-developer-lifecycle-manager',
    imports: [CommonModule, FontAwesomeModule, DeveloperStatusComponent],
    templateUrl: './developer-lifecycle-manager.component.html',
})
export class DeveloperLifecycleManagerComponent {
    @Input() developer?: RenaiDeveloperSearchDto;
    @Output() onDeveloperReload = new EventEmitter<void>();

    constructor(
        private readonly developerService: RenaiDeveloperService,
        private readonly toastService: ToastManagerService,
        private readonly router: Router
    ) {}

    navigateTo(developerId: number): void {
        this.router.navigate([`dashboard/developers/${developerId}`]);
    }

    pauseDeveloper(event: Event, developerId?: number): void {
        event.stopPropagation();
        if (!developerId) return;

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

    resumeDeveloper(event: Event, developerId?: number): void {
        event.stopPropagation();
        if (!developerId) return;

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

    stopDeveloper(event: Event, developerId?: number): void {
        event.stopPropagation();
        if (!developerId) return;

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
