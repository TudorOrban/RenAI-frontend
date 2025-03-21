import { Component, Input } from '@angular/core';
import { ProjectSearchDto } from '../../../models/Project';
import { CommonModule } from '@angular/common';
import { ProjectMediumCardComponent } from "../project-medium-card/project-medium-card.component";

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, ProjectMediumCardComponent],
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent {
    @Input() projects?: ProjectSearchDto[];
    @Input() isLoading?: boolean; 

}
