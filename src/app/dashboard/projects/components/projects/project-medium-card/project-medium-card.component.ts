import { Component, Input } from '@angular/core';
import { ProjectSearchDto } from '../../../models/Project';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-medium-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './project-medium-card.component.html',
  styleUrl: './project-medium-card.component.css'
})
export class ProjectMediumCardComponent {
    @Input() project?: ProjectSearchDto;
}
