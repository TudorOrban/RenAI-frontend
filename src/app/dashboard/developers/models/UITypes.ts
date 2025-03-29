export interface WorkspaceNodeUI {
    name: string;
    directory?: boolean;
    children?: WorkspaceNodeUI[];
    collapsed?: boolean;
    path?: string;
    isExpanded?: boolean; // Referring to UI component not rendering its children
}

export interface WorkspaceTreeUI {
    root: WorkspaceNodeUI;
}

export interface WorkspaceFile {
    name?: string;
    path?: string;
    content?: string;
    fileType?: FileType;
}

export enum FileType {
    TEXT = "TEXT",
    MD = "MD",
    JSON = "JSON",
    XML = "XML",
    JAVASCRIPT = "JAVASCRIPT",
    TYPESCRIPT = "TYPESCRIPT",
    PYTHON = "PYTHON",
    JAVA = "JAVA",
    CSHARP = "CSHARP",
    CPP = "CPP",
    C = "C",
    RUST = "RUST",
    GO = "GO",
    RUBY = "RUBY",
    PHP = "PHP",
    SQL = "SQL",
    SWIFT = "SWIFT",
    DART = "DART",
    KOTLIN = "KOTLIN",
    UNKNOWN = "UNKNOWN"
}