import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { sidebarItems } from "../../config/navigationItems";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { UIItem } from "../../../../shared/types/uiTypes";
import { filter } from "rxjs";

@Component({
    selector: "app-sidebar",
    imports: [CommonModule, FontAwesomeModule, RouterModule],
    templateUrl: "./sidebar.component.html",
    styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
    sidebarItems = sidebarItems;
    currentItem = signal<UIItem | undefined>(undefined);

    constructor(
        private readonly router: Router
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                const path = event.url.split("/");
                if (path?.[1] !== "dashboard") return;
                this.selectItem(path?.[2]);
            });
    }

    selectItem(itemValue?: string): void {
        if (!itemValue) return;

        const item = sidebarItems.find((item) => item.value === itemValue);
        if (!item) return;
        this.currentItem.set(item);
    }

    faQuestion = faQuestion;
}
