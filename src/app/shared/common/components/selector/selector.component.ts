import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UIItem } from '../../../types/uiTypes';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-selector',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css'
})
export class SelectorComponent {
    @Input() items: UIItem[] = [];
    @Input() defaultItemValue?: string;
    @Output() selectedItemChange = new EventEmitter<UIItem>();

    selectedItem: UIItem | null = null;
    isOpen = false;

    ngOnInit(): void {
        this.selectedItem = this.items.find(item => item.value === this.defaultItemValue) || this.items[0] || null;
        if(this.selectedItem){
            this.selectedItemChange.emit(this.selectedItem);
        }
    }

    toggleDropdown(): void {
        this.isOpen = !this.isOpen;
    }

    selectItem(item: UIItem): void {
        this.selectedItem = item;
        this.selectedItemChange.emit(item);
        this.isOpen = false;
    }
}
