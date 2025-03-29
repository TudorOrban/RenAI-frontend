import { Injectable } from "@angular/core";
import { SearchParams } from "../../../../shared/common/types/searchTypes";
import { TaskEvent } from "../../models/RenaiDeveloper";

@Injectable({
    providedIn: "root"
})
export class TaskEventSearcherService {
    private searchedEvents: TaskEvent[] = [];

    getSearchedEvents(): TaskEvent[] {
        return this.searchedEvents;
    }

    searchEvents(events?: TaskEvent[], searchParams?: SearchParams): void {
        if (!events) {
            this.searchedEvents = [];
            return;
        }
        if (!searchParams) {
            this.searchedEvents = events;
            return;
        }

        const searchText = searchParams.searchText?.toLowerCase() ?? "";
        let filteredEvents = events.filter((event) => {
            return true;
            // return (
            //     event.name.toLowerCase().includes(searchText) ||
            //     event.description.toLowerCase().includes(searchText)
            // );
        });

        // Sorting
        filteredEvents.sort((a, b) => {
            const aValue = a[searchParams.sortBy as keyof TaskEvent];
            const bValue = b[searchParams.sortBy as keyof TaskEvent];
            if (!aValue || !bValue) return 0;

            if (aValue < bValue) {
                return searchParams.isAscending ? -1 : 1;
            } else if (aValue > bValue) {
                return searchParams.isAscending ? 1 : -1;
            } else {
                return 0;
            }
        });

        // Paging
        this.searchedEvents = filteredEvents.filter((e, index) => index < (searchParams.itemsPerPage ?? 50));
    }
}