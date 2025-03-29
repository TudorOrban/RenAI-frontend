import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { WorkspaceFileManagerService } from '../../../../services/ui/workspace-file-manager.service';
import { WorkspaceFile } from '../../../../models/RenaiDeveloper';

@Component({
    selector: 'app-file-viewer',
    imports: [CommonModule],
    templateUrl: './file-viewer.component.html',
})
export class FileViewerComponent {
    file?: WorkspaceFile;
    private readonly workspaceFileManager = inject(WorkspaceFileManagerService);

    constructor() {
        effect(() => {
            this.file = this.workspaceFileManager.currentOpenFile();
            // Perform additional logic here
            console.log("File changed:", this.file);
        });
    }
}
