import { Component, Input } from '@angular/core';
import { DataFormatterService } from '../../../../../../../../shared/common/services/data-formatter.service';
import { SelectorComponent } from '../../../../../../../../shared/common/components/selector/selector.component';
import { CommonModule } from '@angular/common';
import { UIItem } from '../../../../../../../../shared/types/uiTypes';

@Component({
    selector: 'app-enum-field',
    imports: [CommonModule, SelectorComponent],
    templateUrl: './enum-field.component.html',
})
export class EnumFieldComponent<T> {
    @Input() label: string = "";
    @Input() value?: T;
    @Input() isEditModeOn?: boolean;
    @Input() enumOptions?: UIItem[] = [];

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}

    onSelectedItemChange(item: UIItem): void {

    }
}
