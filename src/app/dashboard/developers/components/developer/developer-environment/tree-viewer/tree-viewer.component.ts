import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../../models/RenaiDeveloper';
import { WorkspaceTreeUI } from "../../../../models/UITypes";
import { WorkspaceNodeUI } from "../../../../models/UITypes";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp, faFile, faFolder, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { WorkspaceNavigatorService } from '../../../../services/ui/workspace/workspace-navigator.service';
import { WorkspaceFileManagerService } from '../../../../services/ui/workspace/workspace-file-manager.service';

@Component({
    selector: 'app-tree-viewer',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './tree-viewer.component.html',
})
export class TreeViewerComponent implements OnChanges {
    @Input() developer?: RenaiDeveloperSearchDto;
    @Input() tree?: WorkspaceTreeUI;

    constructor(
        private readonly workspaceNavigatorService: WorkspaceNavigatorService,
        private readonly workspaceFileManager: WorkspaceFileManagerService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["tree"] && changes["tree"].currentValue) {
            this.workspaceNavigatorService.determinePaths(this.tree);
        }
    }

    readFile(fileName: string, filePath: string): void {
        this.workspaceFileManager.readFile(this.developer?.id, fileName, filePath);
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
