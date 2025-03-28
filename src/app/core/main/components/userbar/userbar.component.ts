import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../user/services/auth.service';
import { UserDataDto } from '../../../user/models/User';

@Component({
  selector: 'app-userbar',
  imports: [],
  templateUrl: './userbar.component.html',
  styleUrl: './userbar.component.css'
})
export class UserbarComponent implements OnInit {
    currentUser?: UserDataDto;

    constructor(
        private readonly authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.getCurrentUser().subscribe({
            next: (data) => {
                this.currentUser = data ?? undefined;
            }
        });
    }
}
