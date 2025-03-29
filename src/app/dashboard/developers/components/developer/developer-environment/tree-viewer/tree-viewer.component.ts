import { Component, Input } from '@angular/core';
import { RenaiDeveloperSearchDto, WorkspaceNodeUI, WorkspaceTree, WorkspaceTreeUI } from '../../../../models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp, faFile, faFolder, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DeveloperWorkspaceService } from '../../../../services/api/developer-workspace.service';

@Component({
    selector: 'app-tree-viewer',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './tree-viewer.component.html',
})
export class TreeViewerComponent {
    @Input() developer?: RenaiDeveloperSearchDto;
    @Input() tree?: WorkspaceTreeUI;

    constructor(
        private readonly workspaceService: DeveloperWorkspaceService
    ) {}

    readFile(filePath: string): void {
        console.log("Reading: ", filePath);
        if (!this.developer?.id) {
            return;
        }

        this.workspaceService.readFile(this.developer.id, filePath).subscribe({
            next: (data) => {
                console.log("File Content:", data.content);
                // this.fileContent = data.content;
            },
            error: (error) => {
                console.error("Error occurred while reading file:", error.message);
            }
        });
    }

    getCaretIcon(node?: WorkspaceNodeUI): IconDefinition {
        return node?.isExpanded ? faCaretUp : faCaretDown;
    }

    toggleExpanded(node?: WorkspaceNodeUI): void {
        if (!node) return;
        if (!node?.isExpanded) {
            node.isExpanded = true;
            return;
        }
        node.isExpanded = !node?.isExpanded;
    }

    faFolder = faFolder;
    faFile = faFile;
}
