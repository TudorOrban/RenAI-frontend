import { Component, Input } from '@angular/core';
import { ProjectDataDto } from '../../../models/Project';

@Component({
  selector: 'app-developers',
  imports: [],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.css'
})
export class DevelopersComponent {
    @Input() project?: ProjectDataDto;
}
