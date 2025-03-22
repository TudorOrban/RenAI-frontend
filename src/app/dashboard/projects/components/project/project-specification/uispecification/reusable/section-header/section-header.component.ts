import { Component, Input, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-section-header',
    imports: [FontAwesomeModule],
    templateUrl: './section-header.component.html',
})
export class SectionHeaderComponent {
    @Input() title: string = "";
    isExpanded = signal(true);

    faCaretUp = faCaretUp;
    faCaretDown = faCaretDown;

    toggleExpanded(): void {
        this.isExpanded.update((value) => !value);
    }
}
