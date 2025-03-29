import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { WorkspaceFileManagerService } from '../../../../services/ui/workspace/workspace-file-manager.service';
import { WorkspaceFile } from "../../../../models/UITypes";
import { Subscription } from 'rxjs';
import { FileTypeDetectorService } from '../../../../services/ui/workspace/file-type-detector.service';

@Component({
    selector: 'app-file-viewer',
    imports: [CommonModule],
    templateUrl: './file-viewer.component.html',
})
export class FileViewerComponent implements OnInit, OnDestroy {
    file?: WorkspaceFile;
    private fileSubscription?: Subscription;

    constructor(
        private readonly workspaceFileManager: WorkspaceFileManagerService,
        private readonly fileTypeDetector: FileTypeDetectorService,
    ) {}

    ngOnInit(): void {
        this.fileSubscription = this.workspaceFileManager.currentOpenFile$.subscribe((file) => {
            this.handleFileChange(file);
        });
    }

    handleFileChange(file?: WorkspaceFile): void {
        if (!file) return;

        this.file = file;
        this.file.fileType = this.fileTypeDetector.detectFileType(file.name);
        console.log("DSA", this.file.fileType);
    }

    ngOnDestroy(): void {
        if (this.fileSubscription) {
            this.fileSubscription.unsubscribe();
        }
    }
}
