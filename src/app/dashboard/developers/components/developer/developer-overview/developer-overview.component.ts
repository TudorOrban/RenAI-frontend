import { Component, Input } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';

@Component({
    selector: 'app-developer-overview',
    imports: [],
    templateUrl: './developer-overview.component.html',
})
export class DeveloperOverviewComponent {
    @Input() developer?: RenaiDeveloperSearchDto;

}
