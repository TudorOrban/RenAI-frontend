import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DevelopersHeaderComponent } from "./developers-header/developers-header.component";
import { DevelopersListComponent } from "./developers-list/developers-list.component";
import { RenaiDeveloperSearchDto } from '../../models/RenaiDeveloper';
import { SearchParams } from '../../../../shared/common/types/searchTypes';
import { RenaiDeveloperService } from '../../services/api/renai-developer.service';
import { AuthService } from '../../../../core/user/services/auth.service';
import { DeveloperSearcherService } from '../../services/ui/developer-searcher.service';

@Component({
    selector: 'app-developers',
    imports: [CommonModule, FontAwesomeModule, DevelopersHeaderComponent, DevelopersListComponent],
    templateUrl: './developers.component.html',
})
export class DevelopersComponent implements OnInit {
    currentUserId?: number;
    developers?: RenaiDeveloperSearchDto[];
    searchedDevelopers: RenaiDeveloperSearchDto[] = [];

    searchParams: SearchParams = {
        searchText: "", sortBy: "createdAt", isAscending: false,
    } 

    constructor(
        private readonly developerService: RenaiDeveloperService,
        private readonly authService: AuthService,
        private readonly developerSearcherService: DeveloperSearcherService
    ) {}

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe(
            (data) => {
                this.currentUserId = data?.id;
                this.loadDevelopers();
            }
        );
    }


    loadDevelopers(): void {
        if (!this.currentUserId) return;

        this.developerService.getDevelopersByUserId(this.currentUserId).subscribe({
            next: (data) => {
                console.log("Data:", data);
                this.developers = data;
                this.searchDevelopers();
            },
            error: (error) => {
                console.log("Error:", error);
            }
        });
    }

    searchDevelopers(): void {
        this.developerSearcherService.searchDevelopers(this.developers, this.searchParams);
        this.searchedDevelopers = this.developerSearcherService.getSearchedDevelopers();
    }
}
