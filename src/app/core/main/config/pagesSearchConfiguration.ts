import { PagesSearchConfiguration } from "../../../shared/common/types/searchTypes";
import { UIItem } from "../../../shared/types/uiTypes";


export const standardSortOptions: UIItem[] = [
    { label: "Created At", value: "createdAt" },
    { label: "Last Modified", value: "updatedAt" },
    { label: "Name", value: "name" },
];

export const pagesSearchConfiguration: PagesSearchConfiguration = {
    pagesConfig: {
        "/dashboard/projects": {
            sortOptions: standardSortOptions,
        },
    },
};
