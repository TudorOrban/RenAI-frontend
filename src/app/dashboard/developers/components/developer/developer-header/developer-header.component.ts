import { Component, Input } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-developer-header',
    imports: [FontAwesomeModule],
    templateUrl: './developer-header.component.html',
})
export class DeveloperHeaderComponent {
    @Input() developer?: RenaiDeveloperSearchDto;

    faEllipsis = faEllipsis;
}
