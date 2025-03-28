import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeveloperStatus, RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';
import { RenaiDeveloperService } from '../../../services/api/renai-developer.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeveloperStatusComponent } from "../../../../projects/components/project/developers/developer-status/developer-status.component";
import { faArrowLeftRotate, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
        private readonly router: Router
    ) {}

    navigateTo(developerId: number): void {
        this.router.navigate([`dashboard/developers/${developerId}`]);
    }

    pauseDeveloper(developerId: number): void {
        this.developerService.pauseDeveloper(developerId).subscribe({
            next: (data) => {
                console.log("Success");
                this.reloadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
            }
        })
    }

    resumeDeveloper(developerId: number): void {
        this.developerService.resumeDeveloper(developerId).subscribe({
            next: (data) => {
                console.log("Success");
                this.reloadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
            }
        })
    }

    stopDeveloper(developerId: number): void {
        this.developerService.stopDeveloper(developerId).subscribe({
            next: (data) => {
                console.log("Success");
                this.reloadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
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
