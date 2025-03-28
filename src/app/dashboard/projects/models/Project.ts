import { RenaiDeveloperSearchDto } from "../../developers/models/RenaiDeveloper";

export interface ProjectSearchDto {
    id: number;
    userId: number;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProjectDataDto extends ProjectSearchDto {
    jobSpecification?: JobSpecification;
    developers?: RenaiDeveloperSearchDto[];
}

export interface CreateProjectDto {
    userId: number;
    name: string;
    description?: string;
}

export interface UpdateProjectDto {
    id: number;
    userId: number;
    name: string;
    description?: string;
    jobSpecification?: JobSpecification;
    updateSpec?: boolean;
}

export interface JobSpecification {
    appSpecification?: AppSpecification;
    developmentSpecification?: DevelopmentSpecification;
}

// App Spec
export interface AppSpecification {
    appName: string;
    functionalSpecifications: string[];
    appType?: AppType;
    backendStack?: BackendStack;
    frontendStack?: FrontendStack;
}

export enum AppType {
    WEB = "WEB",
    DESKTOP = "DESKTOP"
}

export interface BackendStack {
    architecture?: BackendArchitecture;
    services: BackendService[];
}

export enum BackendArchitecture {
    MONOLITH = "MONOLITH",
    MICROSERVICES = "MICROSERVICES"
}

export interface BackendService {
    name: string;
    framework?: BackendFramework;
    database?: ServiceDatabase;
}

export enum BackendFramework {
    SPRING_BOOT = "SPRING_BOOT",
    DOT_NET = "DOT_NET",
    FASTAPI = "FASTAPI",
    DJANGO = "DJANGO",
    NODE_JS = "NODE_JS",
    LARAVEL = "LARAVEL"
}

export enum ServiceDatabase {
    POSTGRESQL = "POSTGRESQL",
    MYSQL = "MYSQL",
    MONGO_DB = "MONGO_DB",
    CASSANDRA = "CASSANDRA",
    TIMESCALE_DB = "TIMESCALE_DB",
    NEO4J = "NEO4J"
}

export interface FrontendStack {
    framework?: FrontendFramework;
}

export enum FrontendFramework {
    ANGULAR = "ANGULAR",
    REACT = "REACT",
    NEXT_JS = "NEXT_JS",
    VUE = "VUE",
    SVELTE = "SVELTE"
}

// Development Spec
export interface DevelopmentSpecification {
    costSpeedSpec?: CostSpeedSpecification;
    infrastructureSpec?: InfrastructureSpecification;
    developerZooSpec?: DeveloperZooSpecification;   
}

export interface CostSpeedSpecification {
    maxCostDollars?: number;
    maxTimeSeconds?: number;
}

export interface InfrastructureSpecification {
    nodeSpecs: NodeSpecification[];
}

export interface NodeSpecification {
    name?: string;
    computeType?: ComputeType;
    vmSize?: NodeVMSize;
}

export enum ComputeType {
    CPU = "CPU",
    GPU = "GPU"
}

export enum NodeVMSize {
    STANDARD_D2S_V3 = "STANDARD_D2S_V3",
    STANDARD_B2S_V2 = "STANDARD_B2S_V2"
}

export interface DeveloperZooSpecification {
    developerSpecs: DeveloperSpecification[];
}

export interface DeveloperSpecification {
    name: string;
    description?: string;
    subtasks: string[];
}