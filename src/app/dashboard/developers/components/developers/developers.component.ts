import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DevelopersHeaderComponent } from "./developers-header/developers-header.component";
import { DevelopersListComponent } from "./developers-list/developers-list.component";
import { RenaiDeveloperSearchDto } from '../../models/RenaiDeveloper';
import { SearchParams } from '../../../../shared/common/types/searchTypes';
import { RenaiDeveloperService } from '../../services/renai-developer.service';
import { AuthService } from '../../../../core/user/services/auth.service';

@Component({
    selector: 'app-developers',
    imports: [CommonModule, FontAwesomeModule, DevelopersHeaderComponent, DevelopersListComponent],
    templateUrl: './developers.component.html',
})
export class DevelopersComponent implements OnInit {
    currentUserId?: number;
    developers?: RenaiDeveloperSearchDto[];
    searchedDevelopers?: RenaiDeveloperSearchDto[];

    searchParams: SearchParams = {
        searchText: "", sortBy: "createdAt", isAscending: false,
    } 

    constructor(
        private readonly developerService: RenaiDeveloperService,
        private readonly authService: AuthService
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

    private searchDevelopers(): void {
        if (!this.developers) {
            this.searchedDevelopers = [];
            return;
        }

        const searchText = this.searchParams.searchText?.toLowerCase() ?? "";
        let filteredDevelopers = this.developers.filter((developer) => {
            return (
                developer.name.toLowerCase().includes(searchText) ||
                developer.description.toLowerCase().includes(searchText)
            );
        });

        // Sorting
        filteredDevelopers.sort((a, b) => {
            const aValue = a[this.searchParams.sortBy as keyof RenaiDeveloperSearchDto];
            const bValue = b[this.searchParams.sortBy as keyof RenaiDeveloperSearchDto];

            if (aValue < bValue) {
                return this.searchParams.isAscending ? -1 : 1;
            } else if (aValue > bValue) {
                return this.searchParams.isAscending ? 1 : -1;
            } else {
                return 0;
            }
        });

        this.searchedDevelopers = filteredDevelopers;
    }
}
