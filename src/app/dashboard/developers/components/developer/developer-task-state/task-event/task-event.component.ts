import { Component, Input, OnInit, signal } from '@angular/core';
import { DataFormatterService } from '../../../../../../shared/common/services/data-formatter.service';
import { TaskEvent, TaskEventType } from '../../../../models/RenaiDeveloper';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp, faTerminal, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-task-event',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './task-event.component.html',
})
export class TaskEventComponent implements OnInit {
    @Input() event!: TaskEvent;


    shortWriteFileContent = signal<string | undefined>(undefined);
    longWriteFileContent = signal<string | undefined>(undefined); 
    
    isExpandable = signal(false);
    isExpanded = signal(false);

    MAX_LENGTH: number = 32;

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}

    ngOnInit(): void {
        this.determineIsExpandable();
        this.processWriteFileContent();
    }

    toggleIsExpanded(): void {
        this.isExpanded.update(value => !value);
    }

    getCaretIcon(): IconDefinition {
        return this.isExpanded() ? faCaretUp : faCaretDown; 
    }

    determineIsExpandable(): void {
        if (!this.event) return;

        switch (this.event.eventType) {
            case TaskEventType.COMMAND_RESPONSE:
                if (!this.event.commandResponse) {
                    return;
                }
                if (this.event.commandResponse.length > this.MAX_LENGTH) {
                    this.isExpandable.set(true);
                }
                break;
            case TaskEventType.WRITE_FILE_REQUEST:
                if (!this.event.writeFileRequest) {
                    return;
                }
                if (this.event.writeFileRequest.content.length > this.MAX_LENGTH) {
                    this.isExpandable.set(true);
                }
                break;
            case TaskEventType.WRITE_FILE_RESPONSE:
                if (!this.event.writeFileResponse) {
                    return;
                }
                if (this.event.writeFileResponse.length > this.MAX_LENGTH) {
                    this.isExpandable.set(true);
                }
                break;
        }
    }

    truncate(content?: string): string | undefined {
        if ((content?.length ?? 0) < this.MAX_LENGTH) {
            return content;
        }
        return content?.substring(0, this.MAX_LENGTH) + "...";
    }

    processWriteFileContent(): void {
        if (this.event && this.event.eventType === TaskEventType.WRITE_FILE_REQUEST && this.event.writeFileRequest?.content) {
            const shortFormatterContent = this.event.writeFileRequest.content.replace(/\\n/g, " ");
            this.shortWriteFileContent.set(shortFormatterContent);
            const longFormattedContent = this.event.writeFileRequest.content.replace(/\\n/g, "<br>");
            this.longWriteFileContent.set(longFormattedContent);
        } else {
            this.longWriteFileContent.set(undefined);
        }
    }


    TaskEventType = TaskEventType;
    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;
    faTerminal = faTerminal;
}
