import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RenaiDeveloperSearchDto, TaskEventType, TaskState } from '../../../models/RenaiDeveloper';
import { RenaiDeveloperService } from '../../../services/api/renai-developer.service';
import { CommonModule } from '@angular/common';
import { DataFormatterService } from '../../../../../shared/common/services/data-formatter.service';

@Component({
    selector: 'app-developer-task-state',
    imports: [CommonModule],
    templateUrl: './developer-task-state.component.html',
})
export class DeveloperTaskStateComponent implements OnChanges {
    @Input() developer?: RenaiDeveloperSearchDto;

    state?: TaskState;

    constructor(
        private readonly developerService: RenaiDeveloperService,
        readonly dataFormatterService: DataFormatterService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["developer"] && changes["developer"].currentValue?.id !== changes["developer"].previousValue?.id) {
            this.loadTaskState();
        }
    }

    private loadTaskState(): void {
        if (!this.developer?.id) {
            return;
        }

        this.developerService.getState(this.developer.id).subscribe({
            next: (data) => {
                console.log("Data: ", data);
                this.state = data;
            },
            error: (error) => {
                console.error("Error trying to fetch Task State: ", error.message); 
            }
        });
    }

    TaskEventType = TaskEventType;
}
