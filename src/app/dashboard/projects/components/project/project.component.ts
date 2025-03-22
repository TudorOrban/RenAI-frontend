import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ProjectHeaderComponent } from "./project-header/project-header.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectDataDto } from "../../models/Project";
import { UserDataDto } from "../../../../core/user/models/User";
import { ProjectService } from "../../services/api/project.service";
import { AuthService } from "../../../../core/user/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-project",
    imports: [CommonModule, FontAwesomeModule, ProjectHeaderComponent, ProjectOverviewComponent],
    templateUrl: "./project.component.html",
    styleUrl: "./project.component.css",
})
export class ProjectComponent {
    projectId?: number;
    project?: ProjectDataDto;
    user?: UserDataDto;

    isProjectRead?: boolean = false;

    constructor(
        private readonly projectService: ProjectService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe((user) => {
            if (!user) {
                return;
            }
            this.user = user;

            this.route.paramMap.subscribe((params) => {
                this.projectId = Number(params.get("projectId"));

                this.loadProject();
            });
        });
    }

    private loadProject(): void {
        if (!this.projectId) {
            return;
        }

        this.projectService.getProject(this.projectId).subscribe(
            (data) => {
                this.project = data;
            },
            (error) => {
                console.error("Error: ", error);
            }
        );
    }
}
