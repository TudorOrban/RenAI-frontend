import { Routes } from '@angular/router';
import { OverviewComponent } from './dashboard/overview/components/overview/overview.component';
import { HomeComponent } from './core/main/components/home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "dashboard/overview",
        component: OverviewComponent
    }
];
