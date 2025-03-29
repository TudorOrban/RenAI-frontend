import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastItem } from '../../../types/uiTypes';
import { Subscription } from 'rxjs';
import { ToastManagerService } from '../../services/toast-manager.service';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-toast-manager',
    imports: [CommonModule, ToastComponent],
    templateUrl: './toast-manager.component.html',
    styleUrl: './toast-manager.component.css'
})
export class ToastManagerComponent implements OnInit, OnDestroy {
    toasts: ToastItem[] = [];
    private toastsSubscription: Subscription | undefined;

    constructor(private toastManagerService: ToastManagerService) {}

    ngOnInit(): void {
        this.toastsSubscription = this.toastManagerService.getToasts().subscribe((toasts) => {
            this.toasts = toasts;
        });
    }

    ngOnDestroy(): void {
        if (this.toastsSubscription) {
            this.toastsSubscription.unsubscribe();
        }
    }

    removeToast(toastId: number) {
        this.toastManagerService.removeToastById(toastId);
    }
}