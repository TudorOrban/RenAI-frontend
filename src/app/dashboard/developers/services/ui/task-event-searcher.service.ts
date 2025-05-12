import { Injectable } from "@angular/core";
import { SearchParams } from "../../../../shared/common/types/searchTypes";
import { TaskEvent, TaskEventType } from "../../models/RenaiDeveloper";

/*
 * Service responsible for searching through task events (locally)
 */
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
            return event.eventType !== TaskEventType.LLM_RESPONSE
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
        const limit = (searchParams.page ?? 1) * (searchParams.itemsPerPage ?? 50);
        this.searchedEvents = filteredEvents.filter((e, index) => index < limit);
    }
}