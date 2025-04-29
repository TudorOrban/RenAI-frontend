import { Injectable } from "@angular/core";
import { JobSpecificationStateService } from "./job-specification-state.service";
import { AppType, BackendArchitecture, BackendFramework, BackendService, ComputeType, DeveloperSpecification, FrontendFramework, NodeSpecification, NodeVMSize, ServiceDatabase } from "../../models/Project";

/*
 * Service responsible for updating the fields in the Job Specification update form
 */
@Injectable({
    providedIn: "root"
})
export class JobSpecificationUpdaterService {
    constructor(private stateService: JobSpecificationStateService) {}

    
    updateField(fieldId: string, value: any, index?: number): void {
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
                this.updateBackendFramework(value as BackendFramework, index);
                break;
            case 'serviceDatabase':
                this.updateServiceDatabase(value as ServiceDatabase, index);
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
                this.updateComputeType(value as ComputeType, index);
                break;
            case 'nodeVMSize':
                this.updateNodeVMSize(value as NodeVMSize, index);
                break;
            case 'developerSpecs':
                this.updateDeveloperSpecs(value as DeveloperSpecification[]);
                break;
            case 'developerName':
                this.updateDeveloperName(value as string, index);
                break;
            case 'developerDescription':
                this.updateDeveloperDescription(value as string, index);
                break;
            case 'developerSubtasks':
                this.updateDeveloperSubtasks(value as string[], index);
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

    updateBackendFramework(value: BackendFramework, index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.backendStack && currentSpec.appSpecification.backendStack.services) {
            const service = currentSpec.appSpecification.backendStack.services[index];
            if (!service) return;
            service.framework = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateServiceDatabase(value: ServiceDatabase, index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.appSpecification && currentSpec.appSpecification.backendStack && currentSpec.appSpecification.backendStack.services) {
            const service = currentSpec.appSpecification.backendStack.services[index];
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

    updateComputeType(value: ComputeType, index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.infrastructureSpec && currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs) {
            const node = currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs[index];
            if (!node) return;
            node.computeType = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateNodeVMSize(value: NodeVMSize, index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.infrastructureSpec && currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs) {
            const node = currentSpec.developmentSpecification.infrastructureSpec.nodeSpecs[index];
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

    updateDeveloperName(value: string, index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec && currentSpec.developmentSpecification.developerZooSpec.developerSpecs) {
            const developer = currentSpec.developmentSpecification.developerZooSpec.developerSpecs[index];
            if (!developer) return;
            developer.name = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateDeveloperDescription(value: string, index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec && currentSpec.developmentSpecification.developerZooSpec.developerSpecs) {
            const developer = currentSpec.developmentSpecification.developerZooSpec.developerSpecs[index];
            if (!developer) return;
            developer.description = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }

    updateDeveloperSubtasks(value: string[], index?: number): void {
        if (!index) return;
        const currentSpec = this.stateService.editedSpecification;
        if (currentSpec && currentSpec.developmentSpecification && currentSpec.developmentSpecification.developerZooSpec && currentSpec.developmentSpecification.developerZooSpec.developerSpecs) {
            const developer = currentSpec.developmentSpecification.developerZooSpec.developerSpecs[index];
            if (!developer) return;
            developer.subtasks = value;
            this.stateService.setEditedSpecification(currentSpec);
        }
    }
}