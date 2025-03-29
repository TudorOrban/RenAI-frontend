import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskState } from '../../../../models/RenaiDeveloper';
import { TaskEventSearcherService } from '../../../../services/ui/task-event-searcher.service';
import { PageSearchConfiguration, SearchParams } from '../../../../../../shared/common/types/searchTypes';
import { pagesSearchConfiguration } from '../../../../../../core/main/config/pagesSearchConfiguration';
import { faArrowDownWideShort, faArrowLeftRotate, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { UIItem } from '../../../../../../shared/types/uiTypes';
import { SearchInputComponent } from "../../../../../../shared/common/components/search-input/search-input.component";
import { SelectorComponent } from "../../../../../../shared/common/components/selector/selector.component";

@Component({
    selector: 'app-task-events-header',
    imports: [CommonModule, FontAwesomeModule, SearchInputComponent, SelectorComponent],
    templateUrl: './task-events-header.component.html',
})
export class TaskEventsHeaderComponent {
    @Input() searchParams!: SearchParams;
    @Input() includeTitle?: boolean = false;
    @Output() searchParamsChanged = new EventEmitter<void>();

    searchConfig: PageSearchConfiguration = pagesSearchConfiguration.pagesConfig["/dashboard/developers/events"];

    handleSearchTextChange(searchText: string): void {
        this.searchParams.searchText = searchText;
        this.searchParamsChanged.emit();
    }

    handleSortOptionChange(item: UIItem): void {
        this.searchParams.sortBy = item?.value;
        this.searchParamsChanged.emit();
    }

    handleToggleIsAscending(): void {
        this.searchParams.isAscending = !this.searchParams.isAscending;
        this.searchParamsChanged.emit();
    }



    faArrowLeftRotate = faArrowLeftRotate;
    faArrowUpWideShort = faArrowUpWideShort;
    faArrowDownWideShort = faArrowDownWideShort;


    loadMore(): void {
        // this.eventSearcherService.loadMore();
        // this.searchedEvents = this.eventSearcherService.getSearchedEvents();
    }
}
