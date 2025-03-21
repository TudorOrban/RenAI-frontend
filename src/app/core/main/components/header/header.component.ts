import { Component, signal } from '@angular/core';
import { headerItems } from '../../config/navigationItems';
import { CommonModule } from '@angular/common';
import { AppSearchBarComponent } from "../app-search-bar/app-search-bar.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../user/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserbarComponent } from "../userbar/userbar.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FontAwesomeModule, AppSearchBarComponent, UserbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    headerItems = headerItems;
    isLoggedIn = signal(false);
    isUserbarOpen = signal(false);

    constructor(
        private authService: AuthService
    ) {
        this.authService.getCurrentUser().subscribe(
            (data) => {
                this.isLoggedIn.set(!!data);
            }
        );
    }

    toggleUserbar(): void {
        this.isUserbarOpen.set(!this.isUserbarOpen());
    }

    

    faUser = faUser;
}
