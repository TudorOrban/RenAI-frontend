import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchInputComponent } from "../../../../../shared/common/components/search-input/search-input.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDownWideShort, faArrowUpWideShort, faPlus } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { SelectorComponent } from "../../../../../shared/common/components/selector/selector.component";
import { UIItem } from '../../../../../shared/types/uiTypes';
import { PageSearchConfiguration, SearchParams } from '../../../../../shared/common/types/searchTypes';
import { pagesSearchConfiguration } from '../../../../../core/main/config/pagesSearchConfiguration';

@Component({
    selector: 'app-projects-header',
    imports: [CommonModule, FontAwesomeModule, RouterModule, SearchInputComponent, SelectorComponent],
    templateUrl: './projects-header.component.html',
})
export class ProjectsHeaderComponent {
    @Input() searchParams!: SearchParams;
    @Output() searchParamsChanged = new EventEmitter<void>();

    searchConfig: PageSearchConfiguration = pagesSearchConfiguration.pagesConfig["/dashboard/projects"];

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

    faPlus = faPlus;
    faArrowUpWideShort = faArrowUpWideShort;
    faArrowDownWideShort = faArrowDownWideShort;

}
