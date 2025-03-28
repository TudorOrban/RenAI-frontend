import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { RenaiDeveloperService } from '../../../../developers/services/renai-developer.service';
import { DeveloperStatus, RenaiDeveloperSearchDto } from '../../../../developers/models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-developers',
    imports: [CommonModule, FontAwesomeModule],
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

    private loadDevelopers(): void {
        if (!this.project?.id) {
            return;
        }

        this.developerService.getDevelopersByProjectId(this.project.id).subscribe({
            next: (data) => {
                console.log("Data:", data);
                this.developers = data;
            },
            error: (error) => {
                console.log("Error fetching developers: ", error.message);
            }
        });
    }

    DeveloperStatus = DeveloperStatus;
    faPlay = faPlay;
    faPause = faPause;
    faStop = faStop;
}
