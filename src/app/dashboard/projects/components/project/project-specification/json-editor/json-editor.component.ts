import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import JSONEditor from "jsoneditor";
import { JobSpecificationEditorService } from "../../../../services/ui/job-specification-editor.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-json-editor",
    imports: [],
    templateUrl: "./json-editor.component.html",
    styleUrl: "./json-editor.component.css",
})
export class JsonEditorComponent implements OnDestroy {
    @ViewChild("jsonEditorContainer") jsonEditorContainer?: ElementRef;

    private jsonEditor?: JSONEditor;
    private subscription: Subscription;
    
    constructor(public editorService: JobSpecificationEditorService) {
        this.subscription = this.editorService.jobSpecification$.subscribe(() => {
            this.initializeEditor();
        });
    }

    ngAfterViewInit(): void {
        this.initializeEditor();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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
