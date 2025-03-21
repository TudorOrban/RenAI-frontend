import { Component } from '@angular/core';
import { headerItems } from '../../config/sidebarItems';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    headerItems = headerItems;


}
