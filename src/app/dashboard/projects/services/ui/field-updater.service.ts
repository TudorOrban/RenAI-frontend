import { Injectable } from "@angular/core";
import { JobSpecificationStateService } from "./job-specification-state.service";
import { AppType, BackendArchitecture, BackendFramework, BackendService, ComputeType, DeveloperSpecification, FrontendFramework, NodeSpecification, NodeVMSize, ServiceDatabase } from "../../models/Project";

@Injectable({
    providedIn: "root"
})
export class JobSpecificationUpdaterService {
    constructor(private stateService: JobSpecificationStateService) {}

    
    updateField(fieldId: string, value: any, elementName?: string): void {
        switch (fieldId) {
            case 'appName':
                this.updateAppName(value as string);
                break;
            case 'functionalSpecifications':
                this.updateFunctionalSpecifications(value as string[]);
                break;
            case 'appType':
                this.updateAppType(value as AppType);
                break;
            case 'backendArchitecture':
                this.updateBackendArchitecture(value as BackendArchitecture);
                break;
            case 'backendServices':
                this.updateBackendServices(value as BackendService[]);
                break;
            case 'backendFramework':
                this.updateBackendFramework(value as BackendFramework, elementName);
                break;
            case 'serviceDatabase':
                this.updateServiceDatabase(value as ServiceDatabase, elementName);
                break;
            case 'frontendFramework':
                this.updateFrontendFramework(value as FrontendFramework);
                break;
            case 'maxCostDollars':
                this.updateMaxCostDollars(value as number);
                break;
            case 'maxTimeSeconds':
                this.updateMaxTimeSeconds(value as number);
                break;
            case 'nodeSpecs':
                this.updateNodeSpecs(value as NodeSpecification[]);
                break;
            case 'computeType':
                this.updateComputeType(value as ComputeType, elementName);
                break;
            case 'nodeVMSize':
                this.updateNodeVMSize(value as NodeVMSize, elementName);
                break;
            case 'developerSpecs':
                this.updateDeveloperSpecs(value as DeveloperSpecification[]);
                break;
            case 'developerName':
                this.updateDeveloperName(value as string, elementName);
                break;
            case 'developerDescription':
                this.updateDeveloperDescription(value as string, elementName);
                break;
            case 'developerSubtasks':
                this.updateDeveloperSubtasks(value as string[], elementName);
                break;
            default:
                console.warn(`Field ID "${fieldId}" not handled.`);
        }
    }

    updateAppName(value: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification) {
            currentSpec.appSpecification.appName = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateFunctionalSpecifications(value: string[]): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification) {
            currentSpec.appSpecification.functionalSpecifications = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateAppType(value: AppType): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification) {
            currentSpec.appSpecification.appType = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateBackendArchitecture(value: BackendArchitecture): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.backendStack) {
            currentSpec.appSpecification.backendStack.architecture = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateBackendServices(value: BackendService[]): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.backendStack) {
            currentSpec.appSpecification.backendStack.services = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateBackendFramework(value: BackendFramework, elementName?: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.backendStack && currentSpec.appSpecification.backendStack.services) {
            const service = currentSpec.appSpecification.backendStack.services.find((s) => s.name === elementName);
            if (!service) return;
            service.framework = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateServiceDatabase(value: ServiceDatabase, elementName?: string): void {
         const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.backendStack && currentSpec.appSpecification.backendStack.services) {
            const service = currentSpec.appSpecification.backendStack.services.find((s) => s.name === elementName);
            if (!service) return;
            service.database = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateFrontendFramework(value: FrontendFramework): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.frontendStack) {
            currentSpec.appSpecification.frontendStack.framework = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateMaxCostDollars(value: number): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.costSpeedSpec) {
            currentSpec.developmentSpecification.costSpeedSpec.maxCostDollars = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateMaxTimeSeconds(value: number): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.costSpeedSpec) {
            currentSpec.developmentSpecification.costSpeedSpec.maxTimeSeconds = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateNodeSpecs(value: NodeSpecification[]): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.infrastructureSpec) {
            currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateComputeType(value: ComputeType, elementName?: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.infrastructureSpec && currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs) {
            const node = currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs.find((s) => s.name === elementName);
            if (!node) return;
            node.computeType = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateNodeVMSize(value: NodeVMSize, elementName?: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.infrastructureSpec && currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs) {
            const node = currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs.find((s) => s.name === elementName);
            if (!node) return;
            node.vmSize = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateDeveloperSpecs(value: DeveloperSpecification[]): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec) {
            currentSpec.developmentSpecification.developerZooSpec.developerSpecs = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateDeveloperName(value: string, elementName?: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec && currentSpec.developmentSpecification.developerZooSpec.developerSpecs) {
            const developer = currentSpec.developmentSpecification.developerZooSpec.developerSpecs.find((s) => s.name === elementName);
            if (!developer) return;
            developer.name = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateDeveloperDescription(value: string, elementName?: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec && currentSpec.developmentSpecification.developerZooSpec.developerSpecs) {
            const developer = currentSpec.developmentSpecification.developerZooSpec.developerSpecs.find((s) => s.name === elementName);
            if (!developer) return;
            developer.description = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateDeveloperSubtasks(value: string[], elementName?: string): void {
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec && currentSpec.developmentSpecification.developerZooSpec.developerSpecs) {
            const developer = currentSpec.developmentSpecification.developerZooSpec.developerSpecs.find((s) => s.name === elementName);
            if (!developer) return;
            developer.subtasks = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }
}