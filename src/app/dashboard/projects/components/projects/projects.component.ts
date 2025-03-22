import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from "../../../../shared/common/components/search-input/search-input.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../../services/api/project.service';
import { AuthService } from '../../../../core/user/services/auth.service';
import { ProjectSearchDto } from '../../models/Project';
import { ProjectsHeaderComponent } from "./projects-header/projects-header.component";
import { ProjectsListComponent } from "./projects-list/projects-list.component";
import { SearchParams } from '../../../../shared/common/types/searchTypes';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FontAwesomeModule, ProjectsHeaderComponent, ProjectsListComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
    currentUserId?: number;
    projects?: ProjectSearchDto[];
    totalCount?: number;

    searchParams: SearchParams = {
        searchText: "", sortBy: "createdAt", isAscending: false, page: 1, itemsPerPage: 20
    };

    constructor(
        private readonly projectService: ProjectService,
        private readonly authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe(
            (data) => {
                this.currentUserId = data?.id;
                this.searchProjects();
            }
        );
    }

    searchProjects(): void {
        if (!this.currentUserId) return;

        this.projectService.getProjectsByUserId(this.currentUserId, this.searchParams).subscribe(
            (data) => {
                console.log("Data:", data);
                this.projects = data.results;
                this.totalCount = data?.totalCount;
            },
            (error) => {
                console.log("Error:", error);
            }
        );
    }

    faPlus = faPlus;
}
