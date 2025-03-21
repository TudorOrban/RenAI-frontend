import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./core/main/components/sidebar/sidebar.component";
import { filter } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
    isDashboardRoute = false;
  
    constructor(private router: Router) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.isDashboardRoute = event.url.startsWith("/dashboard");
            });
    }
    
}
