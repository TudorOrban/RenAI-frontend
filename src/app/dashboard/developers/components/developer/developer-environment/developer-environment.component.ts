import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
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
    styleUrl: "./developer-environment.component.css"
})
export class DeveloperEnvironmentComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() developer?: RenaiDeveloperSearchDto;

    tree?: WorkspaceTree;
    fileContent?: string;

    @ViewChild("treeViewerElement", { static: false, read: ElementRef }) treeViewer!: ElementRef;
    @ViewChild("resizerElement", { static: false, read: ElementRef }) resizer!: ElementRef;
    @ViewChild("fileViewerElement", { static: false, read: ElementRef }) fileViewer!: ElementRef;

    private isResizing: boolean = false;
    private startX: number = 0;
    private treeWidth: number = 256;

    constructor(
        private readonly workspaceService: DeveloperWorkspaceService
    ) {}

    ngAfterViewInit(): void {
        if (this.resizer && this.resizer.nativeElement) {
            console.log("PPP");
            this.resizer.nativeElement.addEventListener("mousedown", this.onMouseDown.bind(this));
        }
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("mouseup", this.onMouseUp.bind(this));
    }

    ngOnDestroy(): void {
        document.removeEventListener("mousemove", this.onMouseMove.bind(this));
        document.removeEventListener("mouseup", this.onMouseUp.bind(this));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["developer"] && changes["developer"].currentValue?.id !== changes["developer"].previousValue?.id) {
            this.loadWorkspace();
        }
    }

    loadWorkspace(): void {
        if (!this.developer?.id) {
            return;
        }

        this.workspaceService.getWorkspaceTree(this.developer.id, 20).subscribe({
            next: (data) => {
                this.tree = data;
            },
            error: (error) => {
                console.error("Error occurred while fetching workspace tree:", error.message);
            }
        });
    }

    onMouseDown(event: MouseEvent): void {
        if (this.treeViewer && this.treeViewer.nativeElement) {
            console.log("DSAAS");
            this.isResizing = true;
            this.startX = event.pageX;
            this.treeWidth = this.treeViewer.nativeElement.offsetWidth;
        }
    }

    onMouseMove(event: MouseEvent): void {
        if (!this.isResizing) {
            return;
        }

        const newWidth = this.treeWidth + event.pageX - this.startX;
        this.treeViewer.nativeElement.style.width = `${newWidth}px`;
    }

    onMouseUp(): void {
        this.isResizing = false;
    }
}