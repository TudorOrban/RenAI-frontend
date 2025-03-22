import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UIItem } from '../../../types/uiTypes';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-tab-navigation',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './tab-navigation.component.html',
    styleUrl: './tab-navigation.component.css'
})
export class TabNavigationComponent {
    @Input() navigationItems: UIItem[] = [];
    @Input() selectedItemValue?: string;
    @Output() itemSelected = new EventEmitter<UIItem>();

    selectItem(item: UIItem): void {
        this.selectedItemValue = item.value;
        this.itemSelected.emit(item);
    }
}
