import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from "../../../../shared/common/components/search-input/search-input.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../../../core/user/services/auth.service';
import { ProjectSearchDto } from '../../models/Project';
import { ProjectsHeaderComponent } from "./projects-header/projects-header.component";
import { ProjectsListComponent } from "./projects-list/projects-list.component";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, FontAwesomeModule, ProjectsHeaderComponent, ProjectsListComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
    currentUserId?: number;
    projects?: ProjectSearchDto[];

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

    private searchProjects(): void {
        if (!this.currentUserId) return;

        this.projectService.getProjectsByUserId(this.currentUserId).subscribe(
            (data) => {
                console.log("Data:", data);
                this.projects = data;
            },
            (error) => {
                console.log("Error:", error);
            }
        );
    }

    faPlus = faPlus;
}
