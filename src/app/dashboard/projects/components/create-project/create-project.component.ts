import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CreateProjectDto } from "../../models/Project";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ProjectService } from "../../services/api/project.service";
import { AuthService } from "../../../../core/user/services/auth.service";
import { ToastManagerService } from "../../../../shared/common/services/toast-manager.service";
import { ToastType } from "../../../../shared/types/uiTypes";

@Component({
    selector: "app-create-project",
    imports: [CommonModule, FormsModule],
    templateUrl: "./create-project.component.html",
})
export class CreateProjectComponent implements OnInit {
    project: CreateProjectDto = {
        userId: 0,
        name: "",
        description: "",
    };
    hasBeenSubmitted = signal(false);

    constructor(
        private readonly projectService: ProjectService,
        private readonly authService: AuthService,
        private readonly toastService: ToastManagerService,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (data) => {
                if (!data?.id) return;
                this.project.userId = data?.id;
            }
        });
    }

    onSubmit(): void {
        this.hasBeenSubmitted.set(true);
        
        if (!this.project.name) {
            return;
        }
        
        this.projectService.createProject(this.project).subscribe({
            next: (data) => {
                this.toastService.addToast({ title: "Success", details: "Project created successfully.", type: ToastType.SUCCESS });
                this.router.navigate([`/dashboard/projects/${data?.id}`]);
            },
            error: (error) => {
                console.error("Failed to create project:", error);
                this.toastService.addToast({ title: "Error", details: "An error occurred creating project.", type: ToastType.ERROR });
            }
        });
    }
}
