import { Component } from '@angular/core';
import { ToastComponent } from "../../../../shared/common/components/toast/toast.component";
import { ToastItem, ToastType } from '../../../../shared/types/uiTypes';
import { ToastManagerService } from '../../../../shared/common/services/toast-manager.service';

@Component({
    selector: 'app-home',
    imports: [ToastComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(
        private readonly toastService: ToastManagerService
    ) {}

    sItem: ToastItem = { id: 0, title: "Success", details: "Item created successfully.", type: ToastType.SUCCESS };
    eItem: ToastItem = { id: 0, title: "Error occurred", details: "Item creation failed.", type: ToastType.ERROR };
    wItem: ToastItem = { id: 0, title: "Warning", details: "There was an issue with the creation.", type: ToastType.WARNING };
    iItem: ToastItem = { id: 0, title: "Info", details: "You can create items", type: ToastType.INFO };

    addS(): void {
        this.toastService.addToast(this.sItem);
    }

    addE(): void {
        this.toastService.addToast(this.eItem);
    }
    addW(): void {
        this.toastService.addToast(this.wItem);
    }
    addI(): void {
        this.toastService.addToast(this.iItem);
    }
}
