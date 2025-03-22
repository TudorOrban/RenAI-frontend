import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-section-header',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './section-header.component.html',
})
export class SectionHeaderComponent implements OnChanges {
    @Input() title: string = "";
    @Input() depth?: number = 0;
    @Input() defaultIsExpanded = true;
    isExpanded = signal(this.defaultIsExpanded);

    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["defaultIsExpanded"]) {
            this.isExpanded.set(changes["defaultIsExpanded"].currentValue);
        }
    }
    
    toggleExpanded(): void {
        this.isExpanded.update((value) => !value);
    }

    getFontSizeByDepth(): string {
        switch (this.depth) {
            case 0:
                return "18px";
            case 1:
                return "17px";
            default:
                return "16px";
        }
    }
}
