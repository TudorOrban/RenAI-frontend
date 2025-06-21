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
import { UIItem } from "../../../../shared/types/uiTypes";
import { TabNavigationComponent } from "../../../../shared/common/components/tab-navigation/tab-navigation.component";
import { ProjectSpecificationComponent } from "./project-specification/project-specification.component";
import { DevelopersComponent } from "./developers/developers.component";

@Component({
    selector: "app-project",
    imports: [CommonModule, FontAwesomeModule, ProjectHeaderComponent, ProjectOverviewComponent, TabNavigationComponent, ProjectSpecificationComponent, DevelopersComponent],
    templateUrl: "./project.component.html",
})
export class ProjectComponent {
    projectId?: number;
    project?: ProjectDataDto;
    user?: UserDataDto;

    isProjectRead?: boolean = false;

    navigationItems: UIItem[] = [
        { label: "Overview", value: "overview" },
        { label: "Specification", value: "specification" },
        { label: "Developers", value: "developers" },
    ];

    selectedTab: UIItem = this.navigationItems[0];

    selectTab(tab: UIItem): void {
        this.selectedTab = tab;
    }

    constructor(
        private readonly projectService: ProjectService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (user) => {
                if (!user) {
                    return;
                }
                this.user = user;
    
                this.route.paramMap.subscribe((params) => {
                    this.projectId = Number(params.get("projectId"));
    
                    this.loadProject();
                });
            }
        });
    }

    private loadProject(): void {
        if (!this.projectId) {
            return;
        }

        this.projectService.getProject(this.projectId, true).subscribe({
            next: (data) => {
                this.project = data;
                console.log("SA", this.project);
            },
            error: (error) => {
                console.error("Error: ", error);
            }
        });
    }
}
