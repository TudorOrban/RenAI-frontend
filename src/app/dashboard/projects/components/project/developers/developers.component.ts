import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';
import { RenaiDeveloperService } from '../../../../developers/services/api/renai-developer.service';
import { RenaiDeveloperSearchDto } from '../../../../developers/models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DevelopersHeaderComponent } from "../../../../developers/components/developers/developers-header/developers-header.component";
import { DevelopersListComponent } from "../../../../developers/components/developers/developers-list/developers-list.component";
import { SearchParams } from '../../../../../shared/common/types/searchTypes';
import { DeveloperSearcherService } from '../../../../developers/services/ui/developer-searcher.service';

@Component({
    selector: 'app-developers',
    imports: [CommonModule, FontAwesomeModule, DevelopersHeaderComponent, DevelopersListComponent],
    templateUrl: './developers.component.html',
})
export class DevelopersComponent implements OnChanges {
    @Input() project?: ProjectDataDto;

    developers?: RenaiDeveloperSearchDto[];
    searchedDevelopers: RenaiDeveloperSearchDto[] = [];

    searchParams: SearchParams = {
        searchText: "", sortBy: "createdAt", isAscending: false,
    } 
    
    constructor(
        private readonly developerService: RenaiDeveloperService,
        private readonly developerSearcherService: DeveloperSearcherService
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
                this.searchDevelopers();
            },
            error: (error) => {
                console.error("Error fetching developers: ", error.message);
            }
        });
    }

    searchDevelopers(): void {
        this.developerSearcherService.searchDevelopers(this.developers, this.searchParams);
        this.searchedDevelopers = this.developerSearcherService.getSearchedDevelopers();
    }
}
