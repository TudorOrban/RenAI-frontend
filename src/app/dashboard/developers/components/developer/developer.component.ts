import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RenaiDeveloperSearchDto } from '../../models/RenaiDeveloper';
import { UserDataDto } from '../../../../core/user/models/User';
import { UIItem } from '../../../../shared/types/uiTypes';
import { RenaiDeveloperService } from '../../services/api/renai-developer.service';
import { AuthService } from '../../../../core/user/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperHeaderComponent } from "./developer-header/developer-header.component";
import { TabNavigationComponent } from "../../../../shared/common/components/tab-navigation/tab-navigation.component";
import { DeveloperOverviewComponent } from "./developer-overview/developer-overview.component";
import { DeveloperTaskStateComponent } from "./developer-task-state/developer-task-state.component";
import { DeveloperEnvironmentComponent } from "./developer-environment/developer-environment.component";

@Component({
    selector: 'app-developer',
    imports: [CommonModule, FontAwesomeModule, DeveloperHeaderComponent, TabNavigationComponent, DeveloperOverviewComponent, DeveloperTaskStateComponent, DeveloperEnvironmentComponent],
    templateUrl: './developer.component.html',
})
export class DeveloperComponent {

    developerId?: number;
    developer?: RenaiDeveloperSearchDto;
    user?: UserDataDto;

    isDeveloperRead?: boolean = false;

    navigationItems: UIItem[] = [
        { label: "Overview", value: "overview" },
        { label: "Task State", value: "task-state" },
        { label: "Environment", value: "environment" },
    ];

    selectedTab: UIItem = this.navigationItems[0];

    selectTab(tab: UIItem): void {
        this.selectedTab = tab;
    }

    constructor(
        private readonly developerService: RenaiDeveloperService,
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
                this.developerId = Number(params.get("developerId"));

                this.loadDeveloper();
            });
        });
    }

    private loadDeveloper(): void {
        if (!this.developerId) {
            return;
        }

        this.developerService.getDeveloperById(this.developerId).subscribe({
            next: (data) => {
                this.developer = data;
                console.log("SA", this.developer);
            },
            error: (error) => {
                console.error("Error: ", error);
            }
        });
    }
}
