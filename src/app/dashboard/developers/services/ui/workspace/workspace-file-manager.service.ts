import { Injectable, signal } from "@angular/core";
import { DeveloperWorkspaceService } from "../../api/developer-workspace.service";
import { WorkspaceFile } from "../../../models/UITypes";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class WorkspaceFileManagerService {
    private currentOpenFileSubject = new BehaviorSubject<WorkspaceFile | undefined>(undefined);
    currentOpenFile$: Observable<WorkspaceFile | undefined> = this.currentOpenFileSubject.asObservable();

    constructor(
        private readonly workspaceService: DeveloperWorkspaceService
    ) {}

    readFile(developerId?: number, fileName?: string, filePath?: string): void {
        if (!developerId || !filePath) {
            return;
        }

        this.workspaceService.readFile(developerId, filePath).subscribe({
            next: (data) => {
                this.currentOpenFileSubject.next({
                    name: fileName,
                    path: filePath,
                    content: data.content,
                });
            },
            error: (error) => {
                console.error("Error occurred while reading file:", error.message);
            }
        });
    }

}