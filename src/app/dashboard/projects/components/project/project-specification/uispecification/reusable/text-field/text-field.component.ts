import { Component, Input } from '@angular/core';
import { FieldConfig } from '../../../../../../models/uiTypes';

@Component({
    selector: 'app-text-field',
    imports: [],
    templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
    @Input() config: FieldConfig = { label: "", key: "", type: "text" };
    @Input() value?: string;
}
