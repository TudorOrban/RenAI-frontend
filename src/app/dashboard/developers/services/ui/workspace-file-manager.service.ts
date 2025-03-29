import { Injectable, signal } from "@angular/core";
import { DeveloperWorkspaceService } from "../api/developer-workspace.service";
import { WorkspaceFile } from "../../models/RenaiDeveloper";

@Injectable({
    providedIn: "root"
})
export class WorkspaceFileManagerService {
    currentOpenFile = signal<WorkspaceFile | undefined>(undefined);

    constructor(
        private readonly workspaceService: DeveloperWorkspaceService
    ) {}

    readFile(developerId?: number, filePath?: string): void {
        if (!developerId || !filePath) {
            return;
        }

        this.workspaceService.readFile(developerId, filePath).subscribe({
            next: (data) => {
                this.currentOpenFile.set({ 
                    path: filePath,
                    content: data.content,
                });
            },
            error: (error) => {
                console.error("Error occurred while reading file:", error.message);
            }
        });
    }

    getCurrentOpenFile(): WorkspaceFile | undefined {
        return this.currentOpenFile();
    }

}