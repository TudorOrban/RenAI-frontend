import { Component, effect, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import JSONEditor from "jsoneditor";
import { JobSpecificationEditorService } from "../../../../services/ui/job-specification-editor.service";
import { combineLatest, distinctUntilChanged, map, Subscription } from "rxjs";
import { JobSpecificationStateService } from "../../../../services/ui/job-specification-state.service";

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
        private readonly stateService: JobSpecificationStateService,
        private readonly editorService: JobSpecificationEditorService
    ) {
        this.jobSpecSubscription = combineLatest([
            this.stateService.state$.pipe(map(state => state.editingState.jsonValue), distinctUntilChanged()),
            this.stateService.state$.pipe(map(state => state.editingState.isEditModeOn), distinctUntilChanged())
        ]).subscribe(() => {
            this.syncEditor();
        });
    }

    ngOnDestroy(): void {
        this.jobSpecSubscription.unsubscribe();
        if (this.jsonEditor) {
            this.jsonEditor.destroy();
        }
    }

    private syncEditor(): void {
        if (!this.jsonEditorContainer || !this.stateService.jsonValue) {
            if (this.jsonEditor) {
                this.jsonEditor.destroy();
                this.jsonEditor = undefined;
            }
            return;
        }

        if (!this.jsonEditor) {
            try {
                this.jsonEditor = new JSONEditor(this.jsonEditorContainer.nativeElement, {
                    mode: this.stateService.isEditModeOn ? "code" : "view",
                    onChange: () => this.handleJsonChange(),
                });
                this.jsonEditor.setText(this.stateService.jsonValue);
            } catch (error) {
                console.error("Error initializing JSONEditor:", error);
            }
        } else {
            this.jsonEditor.setMode(this.stateService.isEditModeOn ? "code" : "view");
            if (this.jsonEditor.getText() !== this.stateService.jsonValue) {
                this.jsonEditor.setText(this.stateService.jsonValue ?? "");
            }
        }
    }

    private handleJsonChange(): void {
        if (!this.jsonEditor) return;
        this.editorService.onJsonChange(this.jsonEditor.getText());
    }
}
