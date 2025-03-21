import { faDiagramProject, faGear, faGlobe, faUsers } from "@fortawesome/free-solid-svg-icons";
import { UIItem } from "../../../shared/types/uiTypes";

export const headerItems: UIItem[] = [
    {
        label: "Home",
        value: "home",
        link: ""
    },
    {
        label: "Dashboard",
        value: "dashboard",
        link: "/dashboard/overview"
    },
    {
        label: "Product",
        value: "product",
        link: "/product"
    },
    {
        label: "Resources",
        value: "resources",
        link: "/resources"
    }
];

export const sidebarItems: UIItem[] = [
    {
        label: "Overview",
        value: "overview",
        link: "/dashboard/overview",
        icon: faGlobe
    },
    {
        label: "Organization",
        value: "organization",
        link: "/dashboard/organization",
        icon: faUsers
    },
    {
        label: "Projects",
        value: "projects",
        link: "/dashboard/projects",
        icon: faDiagramProject
    },
    {
        label: "Settings",
        value: "settings",
        link: "/dashboard/settings",
        icon: faGear
    }
];