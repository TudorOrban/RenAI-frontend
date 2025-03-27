

export interface RenaiDeveloperSearchDto {
    id: number;
    projectId: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    developerState: DeveloperState;
}

export interface DeveloperState {
    deploymentName: string;
    status: DeveloperStatus;
    subtasks: string[];
}

export enum DeveloperStatus {
    RUNNING = "RUNNING",
    CREATING = "CREATING",
    DESTROYING = "DESTROYING",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
    FAILED = "FAILED"
}