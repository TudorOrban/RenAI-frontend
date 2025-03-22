import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-array-field',
    imports: [CommonModule],
    templateUrl: './array-field.component.html',
})
export class ArrayFieldComponent {
    @Input() label: string = "";
    @Input() items: string[] = [];
}
