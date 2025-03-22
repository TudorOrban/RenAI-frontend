import { Component, Input } from '@angular/core';
import { JobSpecification } from '../../../../models/Project';
import { DataFormatterService } from '../../../../../../shared/common/services/data-formatter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uispecification',
  imports: [CommonModule],
  templateUrl: './uispecification.component.html',
  styleUrl: './uispecification.component.css'
})
export class UISpecificationComponent {
    @Input() jobSpecification?: JobSpecification;

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}
}
