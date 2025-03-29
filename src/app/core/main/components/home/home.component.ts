import { Component } from '@angular/core';
import { ToastComponent } from "../../../../shared/common/components/toast/toast.component";
import { ToastItem, ToastType } from '../../../../shared/types/uiTypes';

@Component({
    selector: 'app-home',
    imports: [ToastComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    sItem: ToastItem = { title: "Success", details: "Item created successfully.", type: ToastType.SUCCESS };
    eItem: ToastItem = { title: "Error occurred", details: "Item creation failed.", type: ToastType.ERROR };
    wItem: ToastItem = { title: "Warning", details: "There was an issue with the creation.", type: ToastType.WARNING };
    iItem: ToastItem = { title: "Info", details: "You can create items", type: ToastType.INFO };
}
