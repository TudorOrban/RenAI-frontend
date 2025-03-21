import { Component } from '@angular/core';
import { headerItems } from '../../config/navigationItems';
import { CommonModule } from '@angular/common';
import { AppSearchBarComponent } from "../app-search-bar/app-search-bar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, AppSearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    headerItems = headerItems;


}
