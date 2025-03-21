import { Component } from '@angular/core';
import { SearchInputComponent } from "../../../../../shared/common/components/search-input/search-input.component";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-header',
  imports: [CommonModule, FontAwesomeModule, RouterModule, SearchInputComponent],
  templateUrl: './projects-header.component.html',
  styleUrl: './projects-header.component.css'
})
export class ProjectsHeaderComponent {


    faPlus = faPlus;
}
