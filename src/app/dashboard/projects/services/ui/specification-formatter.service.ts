import { Injectable } from "@angular/core";
import { AppType, BackendFramework, FrontendFramework, BackendArchitecture, ComputeType, NodeVMSize, ServiceDatabase } from '../../models/Project';
import { UIItem } from "../../../../shared/types/uiTypes";
import { DataFormatterService } from "../../../../shared/common/services/data-formatter.service";

@Injectable({
    providedIn: "root"
})
export class SpecificationFormatterService {

    constructor(
        private readonly dataFormatterService: DataFormatterService
    ) {}

    getAppTypeOptions(): UIItem[] {
        return Object.values(AppType).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }

    getArchitectureOptions(): UIItem[] {
        return Object.values(BackendArchitecture).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }

    getBackendFrameworkOptions(): UIItem[] {
        return Object.values(BackendFramework).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }

    getServiceDatabaseOptions(): UIItem[] {
        return Object.values(ServiceDatabase).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }
    
    getFrontendFrameworkOptions(): UIItem[] {
        return Object.values(FrontendFramework).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }

    getComputeTypeOptions(): UIItem[] {
        return Object.values(ComputeType).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }

    getNodeVMSizeOptions(): UIItem[] {
        return Object.values(NodeVMSize).map((value) => ({
            label: this.dataFormatterService.formatEnumString(value),
            value: value,
        }));
    }
}