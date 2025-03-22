import { Component, Input } from '@angular/core';
import { DataFormatterService } from '../../../../../../../../shared/common/services/data-formatter.service';

@Component({
    selector: 'app-enum-field',
    imports: [],
    templateUrl: './enum-field.component.html',
})
export class EnumFieldComponent<T> {
    @Input() label: string = "";
    @Input() value?: T;

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}
}
