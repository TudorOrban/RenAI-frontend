import { Routes } from '@angular/router';
import { OverviewComponent } from './dashboard/overview/components/overview/overview.component';
import { HomeComponent } from './core/main/components/home/home.component';
import { ProductComponent } from './core/main/components/product/product.component';
import { ResourcesComponent } from './core/main/components/resources/resources.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "product",
        component: ProductComponent
    },
    {
        path: "resources",
        component: ResourcesComponent
    },
    {
        path: "dashboard/overview",
        component: OverviewComponent
    }
];
