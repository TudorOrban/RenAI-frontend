import { Component, Input } from '@angular/core';
import { RenaiDeveloperSearchDto } from '../../../models/RenaiDeveloper';
import { DataFormatterService } from '../../../../../shared/common/services/data-formatter.service';

@Component({
    selector: 'app-developer-overview',
    imports: [],
    templateUrl: './developer-overview.component.html',
})
export class DeveloperOverviewComponent {
    @Input() developer?: RenaiDeveloperSearchDto;

    constructor(
        readonly dataFormatterService: DataFormatterService
    ) {}
    

}
