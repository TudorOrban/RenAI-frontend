import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { RenaiDeveloperSearchDto, WorkspaceTree } from "../../../models/RenaiDeveloper";
import { DeveloperWorkspaceService } from "../../../services/api/developer-workspace.service";

@Component({
    selector: "app-developer-environment",
    imports: [],
    templateUrl: "./developer-environment.component.html",
})
export class DeveloperEnvironmentComponent implements OnChanges {
    @Input() developer?: RenaiDeveloperSearchDto;

    tree?: WorkspaceTree;

    constructor(
        private readonly workspaceService: DeveloperWorkspaceService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["developer"] && changes["developer"].currentValue?.id !== changes["developer"].previousValue?.id) {
            this.loadWorkspace();
        }
    }

    loadWorkspace(): void {
        if (!this.developer?.id) {
            return;
        }

        this.workspaceService.getWorkspaceTree(this.developer.id, 10).subscribe({
            next: (data) => {
                console.log("Data:", data);
                this.tree = data;
            },
            error: (error) => {
                console.error("Error occurred while fetching workspace tree:", error.message);
            }
        });
    }


}
