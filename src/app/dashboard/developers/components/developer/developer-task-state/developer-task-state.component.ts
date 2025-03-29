import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RenaiDeveloperSearchDto, TaskEvent, TaskEventType, TaskState } from '../../../models/RenaiDeveloper';
import { RenaiDeveloperService } from '../../../services/api/renai-developer.service';
import { CommonModule } from '@angular/common';
import { DataFormatterService } from '../../../../../shared/common/services/data-formatter.service';
import { TaskEventComponent } from "./task-event/task-event.component";
import { SearchParams } from '../../../../../shared/common/types/searchTypes';
import { TaskEventSearcherService } from '../../../services/ui/task-event-searcher.service';
import { DevelopersHeaderComponent } from "../../developers/developers-header/developers-header.component";
import { TaskEventsHeaderComponent } from "./task-events-header/task-events-header.component";

@Component({
    selector: 'app-developer-task-state',
    imports: [CommonModule, TaskEventComponent, TaskEventsHeaderComponent],
    templateUrl: './developer-task-state.component.html',
})
export class DeveloperTaskStateComponent implements OnChanges {
    @Input() developer?: RenaiDeveloperSearchDto;

    state?: TaskState;
    searchedEvents: TaskEvent[] = [];

    searchParams: SearchParams = {
        searchText: "", sortBy: "timestamp", isAscending: false, page: 1, itemsPerPage: 50
    };

    constructor(
        private readonly developerService: RenaiDeveloperService,
        private readonly eventSearcherService: TaskEventSearcherService,
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
                this.state = data;
                this.searchEvents();
            },
            error: (error) => {
                console.error("Error trying to fetch Task State: ", error.message); 
            }
        });
    }
    
    searchEvents(): void {
        this.eventSearcherService.searchEvents(this.state?.taskEvents, this.searchParams);
        this.searchedEvents = this.eventSearcherService.getSearchedEvents();
    }

    TaskEventType = TaskEventType;
}
