import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-enum-field',
    imports: [],
    templateUrl: './enum-field.component.html',
})
export class EnumFieldComponent<T> {
    @Input() label: string = "";
    @Input() value?: T;
}
