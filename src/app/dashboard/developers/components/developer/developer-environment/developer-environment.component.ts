import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { RenaiDeveloperSearchDto, WorkspaceTree } from "../../../models/RenaiDeveloper";
import { DeveloperWorkspaceService } from "../../../services/api/developer-workspace.service";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TreeViewerComponent } from "./tree-viewer/tree-viewer.component";
import { FileViewerComponent } from "./file-viewer/file-viewer.component";

@Component({
    selector: "app-developer-environment",
    imports: [CommonModule, FontAwesomeModule, TreeViewerComponent, FileViewerComponent],
    templateUrl: "./developer-environment.component.html",
})
export class DeveloperEnvironmentComponent implements OnChanges {
    @Input() developer?: RenaiDeveloperSearchDto;

    tree?: WorkspaceTree;
    fileContent?: string;

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

        this.workspaceService.getWorkspaceTree(this.developer.id, 30).subscribe({
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
