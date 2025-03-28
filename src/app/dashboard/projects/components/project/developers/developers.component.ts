import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { RenaiDeveloperService } from '../../../../developers/services/renai-developer.service';
import { DeveloperStatus, RenaiDeveloperSearchDto } from '../../../../developers/models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeftRotate, faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { DeveloperStatusComponent } from "./developer-status/developer-status.component";
import { SearchInputComponent } from "../../../../../shared/common/components/search-input/search-input.component";

@Component({
    selector: 'app-developers',
    imports: [CommonModule, FontAwesomeModule, DeveloperStatusComponent, SearchInputComponent],
    templateUrl: './developers.component.html',
})
export class DevelopersComponent implements OnChanges {
    @Input() project?: ProjectDataDto;

    developers?: RenaiDeveloperSearchDto[];

    constructor(
        private readonly developerService: RenaiDeveloperService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["project"] && changes["project"].previousValue?.id !== changes["project"].currentValue?.id) {
            this.loadDevelopers();
        }
    }

    loadDevelopers(): void {
        if (!this.project?.id) {
            return;
        }

        this.developerService.getDevelopersByProjectId(this.project.id).subscribe({
            next: (data) => {
                console.log("Data:", data);
                this.developers = data;
            },
            error: (error) => {
                console.error("Error fetching developers: ", error.message);
            }
        });
    }

    pauseDeveloper(developerId: number): void {
        this.developerService.pauseDeveloper(developerId).subscribe({
            next: (data) => {
                console.log("Success");
                this.loadDevelopers();
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
                this.loadDevelopers();
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
                this.loadDevelopers();
            },
            error: (error) => {
                console.error("Error pausing developer: ", error.message);
            }
        })
    }

    DeveloperStatus = DeveloperStatus;
    faArrowLeftRotate = faArrowLeftRotate;
    faPlay = faPlay;
    faPause = faPause;
    faStop = faStop;
}
