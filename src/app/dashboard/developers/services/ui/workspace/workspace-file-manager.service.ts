import { Injectable } from "@angular/core";
import { DeveloperWorkspaceService } from "../../api/developer-workspace.service";
import { WorkspaceFile } from "../../../models/UITypes";
import { BehaviorSubject, Observable } from "rxjs";

/*
 * Service responsible for managing open files in the workspace editor (with caching)
 */
@Injectable({
    providedIn: "root"
})
export class WorkspaceFileManagerService {
    private currentOpenFileSubject = new BehaviorSubject<WorkspaceFile | undefined>(undefined);
    currentOpenFile$: Observable<WorkspaceFile | undefined> = this.currentOpenFileSubject.asObservable();

    private cachedFiles: Record<string, WorkspaceFile> = {};

    constructor(
        private readonly workspaceService: DeveloperWorkspaceService
    ) {}

    readFile(developerId?: number, fileName?: string, filePath?: string): void {
        if (!developerId || !filePath) {
            return;
        }

        if (this.cachedFiles[filePath]) {
            this.currentOpenFileSubject.next(this.cachedFiles[filePath]);
        }

        this.workspaceService.readFile(developerId, filePath).subscribe({
            next: (data) => {
                const openedFile = {
                    name: fileName,
                    path: filePath,
                    content: data.content,
                };
                this.currentOpenFileSubject.next(openedFile);
                this.cachedFiles[filePath] = openedFile;
            },
            error: (error) => {
                console.error("Error occurred while reading file:", error.message);
            }
        });
    }

}