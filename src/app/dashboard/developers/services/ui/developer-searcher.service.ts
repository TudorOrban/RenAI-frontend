import { Injectable } from "@angular/core";
import { RenaiDeveloperSearchDto } from "../../models/RenaiDeveloper";
import { SearchParams } from "../../../../shared/common/types/searchTypes";

@Injectable({
    providedIn: "root"
})
export class DeveloperSearcherService {
    private searchedDevelopers: RenaiDeveloperSearchDto[] = [];

    getSearchedDevelopers(): RenaiDeveloperSearchDto[] {
        return this.searchedDevelopers;
    }

    searchDevelopers(developers?: RenaiDeveloperSearchDto[], searchParams?: SearchParams): void {
        if (!developers) {
            this.searchedDevelopers = [];
            return;
        }
        if (!searchParams) {
            this.searchedDevelopers = developers;
            return;
        }

        const searchText = searchParams.searchText?.toLowerCase() ?? "";
        let filteredDevelopers = developers.filter((developer) => {
            return (
                developer.name.toLowerCase().includes(searchText) ||
                developer.description.toLowerCase().includes(searchText)
            );
        });

        // Sorting
        filteredDevelopers.sort((a, b) => {
            const aValue = a[searchParams.sortBy as keyof RenaiDeveloperSearchDto];
            const bValue = b[searchParams.sortBy as keyof RenaiDeveloperSearchDto];

            if (aValue < bValue) {
                return searchParams.isAscending ? -1 : 1;
            } else if (aValue > bValue) {
                return searchParams.isAscending ? 1 : -1;
            } else {
                return 0;
            }
        });

        this.searchedDevelopers = filteredDevelopers;
    }
}