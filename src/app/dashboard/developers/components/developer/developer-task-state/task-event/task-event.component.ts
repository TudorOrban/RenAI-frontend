import { Component, Input, signal } from '@angular/core';
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
export class TaskEventComponent {
    @Input() event!: TaskEvent;

    isExpandable = signal(false);
    isExpanded = signal(false);

    MAX_LENGTH: number = 40;

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {
        this.determineIsExpandable
    }

    toggleIsExpanded(): void {
        this.isExpanded.update(value => !value);
    }

    getCaretIcon(): IconDefinition {
        return this.isExpanded() ? faCaretUp : faCaretDown; 
    }

    determineIsExpandable(): void {
        if (!this.event.commandResponse) {
            return;
        }

        if (this.event.commandResponse.length > this.MAX_LENGTH) {
            this.isExpandable.set(true);
        }
    }

    truncate(content?: string): string | undefined {
        if ((content?.length ?? 0) < this.MAX_LENGTH) {
            return content;
        }
        return content?.substring(0, this.MAX_LENGTH);
    }


    TaskEventType = TaskEventType;
    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;
    faTerminal = faTerminal;
}
