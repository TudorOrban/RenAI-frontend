import { Component, effect, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import JSONEditor from "jsoneditor";
import { JobSpecificationEditorService } from "../../../../services/ui/job-specification-editor.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-json-editor",
    imports: [],
    templateUrl: "./json-editor.component.html",
})
export class JsonEditorComponent implements OnDestroy {
    @ViewChild("jsonEditorContainer") jsonEditorContainer?: ElementRef;

    private jsonEditor?: JSONEditor;
    private jobSpecSubscription: Subscription;

    constructor(
        private readonly editorService: JobSpecificationEditorService
    ) {
        this.jobSpecSubscription = this.editorService.jobSpecification$.subscribe(() => {
            this.initializeEditor();
        });

        effect(() => {
            this.editorService.isEditModeOn();             
            this.jsonEditor?.setMode(this.editorService.isEditModeOn() ? "code" : "view");
        });
    }

    ngAfterViewInit(): void {
        this.initializeEditor();
    }

    ngOnDestroy(): void {
        this.jobSpecSubscription.unsubscribe();
    }

    private initializeEditor(): void {
        if (!this.jsonEditorContainer || !this.editorService.jsonValue()) {
            if (this.jsonEditor) {
                this.jsonEditor.destroy();
                this.jsonEditor = undefined;
            }
            return;
        }

        try {
            if (this.jsonEditor) {
                this.jsonEditor.destroy();
            }
            this.jsonEditor = new JSONEditor(this.jsonEditorContainer.nativeElement, {
                mode: this.editorService.isEditModeOn() ? "code" : "view",
                onChange: () => this.handleJsonChange(),
            });
            this.jsonEditor.setText(this.editorService.jsonValue() ?? "");
        } catch (error) {
            console.error("Error initializing JSONEditor:", error);
        }
    }

    private handleJsonChange(): void {
        if (!this.jsonEditor) return;
        this.editorService.onJsonChange(this.jsonEditor.getText());
    }
}
