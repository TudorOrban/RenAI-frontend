import { Component, OnInit, signal } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./core/main/components/sidebar/sidebar.component";
import { filter } from "rxjs";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./core/main/components/header/header.component";
import { AuthService } from "./core/user/services/auth.service";
import { ToastManagerComponent } from "./shared/common/components/toast-manager/toast-manager.component";

@Component({
  selector: "app-root",
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, ToastManagerComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
    isDashboardRoute = signal(false);
  
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.isDashboardRoute.set(event.url.startsWith("/dashboard"));
            });
    }

    ngOnInit(): void {
        this.authService.setCurrentUser({
            id: 1, username: "Tudor" 
        });
    }
    
}
