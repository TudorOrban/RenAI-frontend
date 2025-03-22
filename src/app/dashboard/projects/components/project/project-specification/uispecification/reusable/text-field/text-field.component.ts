import { Component, Input } from '@angular/core';
import { FieldConfig } from '../../../../../../models/uiTypes';

@Component({
    selector: 'app-text-field',
    imports: [],
    templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
    @Input() label!: string;
    @Input() value?: string;
}
