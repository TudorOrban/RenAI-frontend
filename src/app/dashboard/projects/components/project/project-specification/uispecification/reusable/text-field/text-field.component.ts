import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-text-field',
    imports: [CommonModule, FormsModule],
    templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
    @Input() label!: string;
    @Input() value?: string;
    @Input() isEditModeOn?: boolean;
}
