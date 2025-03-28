import { Component, Input } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';

@Component({
    selector: 'app-developer-task-state',
    imports: [],
    templateUrl: './developer-task-state.component.html',
})
export class DeveloperTaskStateComponent {
    @Input() developer?: RenaiDeveloperSearchDto;
}
