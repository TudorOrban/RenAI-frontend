import { Routes } from '@angular/router';
import { OverviewComponent } from './dashboard/overview/components/overview/overview.component';
import { HomeComponent } from './core/main/components/home/home.component';
import { ProductComponent } from './core/main/components/product/product.component';
import { ResourcesComponent } from './core/main/components/resources/resources.component';
import { OrganizationComponent } from './dashboard/organization/components/organization/organization.component';
import { ProjectsComponent } from './dashboard/projects/components/projects/projects.component';
import { SettingsComponent } from './dashboard/settings/components/settings/settings.component';

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
    },
    {
        path: "dashboard/organization",
        component: OrganizationComponent
    },
    {
        path: "dashboard/projects",
        component: ProjectsComponent
    },
    {
        path: "dashboard/settings",
        component: SettingsComponent
    }
];
