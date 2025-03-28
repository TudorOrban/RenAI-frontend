import { EventType } from "@angular/router";
import { ProjectDataDto } from "../../projects/models/Project";


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

export interface TaskState {
    projectDataDto: ProjectDataDto;
    taskEvents: TaskEvent[];
    developerStatus: DeveloperStatus;
}

export interface TaskEvent {
    eventType: TaskEventType;
    timestamp: Date;
    llmResponse: string;
    commandRequest: string;
    commandResponse: string;
    writeFileRequest: WriteFileRequest;
    writeFileResponse: string;

}

export enum TaskEventType {
    LLM_RESPONSE = "LLM_RESPONSE",
    RUN_COMMAND_REQUEST = "RUN_COMMAND_REQUEST",
    COMMAND_RESPONSE = "COMMAND_RESPONSE",
    WRITE_FILE_REQUEST = "WRITE_FILE_REQUEST",
    WRITE_FILE_RESPONSE = "WRITE_FILE_RESPONSE"
}

export interface WriteFileRequest {
    filepath: string;
    content: string;
}

export enum ResponseType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export interface LifecycleActionResponseDto {
    message: string;
}