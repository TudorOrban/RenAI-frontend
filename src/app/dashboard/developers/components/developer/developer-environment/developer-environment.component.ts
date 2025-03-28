import { Component, Input } from "@angular/core";
import { RenaiDeveloperSearchDto } from "../../../models/RenaiDeveloper";

@Component({
    selector: "app-developer-environment",
    imports: [],
    templateUrl: "./developer-environment.component.html",
})
export class DeveloperEnvironmentComponent {
    @Input() developer?: RenaiDeveloperSearchDto;
}
