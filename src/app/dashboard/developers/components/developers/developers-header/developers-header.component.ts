import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchInputComponent } from "../../../../../shared/common/components/search-input/search-input.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDownWideShort, faArrowLeftRotate, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import { PageSearchConfiguration, SearchParams } from '../../../../../shared/common/types/searchTypes';
import { pagesSearchConfiguration } from '../../../../../core/main/config/pagesSearchConfiguration';
import { UIItem } from '../../../../../shared/types/uiTypes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelectorComponent } from "../../../../../shared/common/components/selector/selector.component";

@Component({
    selector: 'app-developers-header',
    imports: [CommonModule, FontAwesomeModule, RouterModule, SearchInputComponent, SelectorComponent],
    templateUrl: './developers-header.component.html',
})
export class DevelopersHeaderComponent {
    @Input() searchParams!: SearchParams;
    @Input() includeTitle?: boolean = false;
    @Output() searchParamsChanged = new EventEmitter<void>();
    @Output() onRefresh = new EventEmitter<void>();

    searchConfig: PageSearchConfiguration = pagesSearchConfiguration.pagesConfig["/dashboard/developers"];

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

    handleRefresh(): void {
        this.onRefresh.emit();
    }


    faArrowLeftRotate = faArrowLeftRotate;
    faArrowUpWideShort = faArrowUpWideShort;
    faArrowDownWideShort = faArrowDownWideShort;

}
