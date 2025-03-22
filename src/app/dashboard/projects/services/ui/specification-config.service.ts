import { Injectable } from "@angular/core";
import { SectionConfig } from "../../models/uiTypes";
import { AppType, BackendArchitecture, FrontendFramework } from "../../models/Project";

@Injectable({
    providedIn: "root"
})
export class SpecificationConfigService {
    getAppSpecificationConfig(): SectionConfig {
        return {
            title: "App Specification",
            fields: [
                { label: "App Name", key: "appName", type: "text", edit: true },
                { label: "Functional Specifications", key: "functionalSpecifications", type: "array", edit: true },
                { label: "App Type", key: "appType", type: "enum", options: Object.values(AppType), edit: true },
                { label: "Backend Stack", key: "backendStack", type: "object", edit: true},
                { label: "Frontend Stack", key: "frontendStack", type: "object", edit: true}
            ],
        };
    }
    getBackendStackConfig(): SectionConfig {
        return {
            title: "Backend Stack",
            fields: [
                {label: "Architecture", key: "architecture", type: "enum", options: Object.values(BackendArchitecture), edit: true},
                {label: "Services", key: "services", type: "array", edit: true}
            ]
        }
    }
    getFrontendStackConfig(): SectionConfig {
        return {
            title: "Frontend Stack",
            fields: [
                {label: "Framework", key: "framework", type: "enum", options: Object.values(FrontendFramework), edit: true}
            ]
        }
    }

    getDevelopmentSpecificationConfig(): SectionConfig {
        return {
            title: "Development Specification",
            fields: [
                { label: "Maximum Cost ($)", key: "maxCostDollars", type: "text", edit: true },
                { label: "Maximum Time", key: "maxTimeSeconds", type: "text", edit: true },
                { label: "Infrastructure Specification", key: "infrastructureSpec", type: "object", edit: true },
                { label: "Developer Zoo Specification", key: "developerZooSpec", type: "object", edit: true }
            ],
        };
    }
}