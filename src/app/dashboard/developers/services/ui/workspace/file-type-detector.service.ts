import { Injectable } from "@angular/core";
import { FileType } from "../../../models/UITypes";

@Injectable({
    providedIn: "root",
})
export class FileTypeDetectorService {
    detectFileType(fileName?: string): FileType {
        if (!fileName) return FileType.UNKNOWN;

        const extension = fileName.split(".").pop()?.toLowerCase();

        switch (extension) {
            case "txt":
                return FileType.TEXT;
            case "md":
                return FileType.MD;
            case "json":
                return FileType.JSON;
            case "xml":
                return FileType.XML;
            case "js":
                return FileType.JAVASCRIPT;
            case "ts":
                return FileType.TYPESCRIPT;
            case "py":
                return FileType.PYTHON;
            case "java":
                return FileType.JAVA;
            case "cs":
                return FileType.CSHARP;
            case "cpp":
            case "cxx":
                return FileType.CPP;
            case "c":
                return FileType.C;
            case "rs":
                return FileType.RUST;
            case "go":
                return FileType.GO;
            case "rb":
                return FileType.RUBY;
            case "php":
                return FileType.PHP;
            case "sql":
                return FileType.SQL;
            case "swift":
                return FileType.SWIFT;
            case "dart":
                return FileType.DART;
            case "kt":
                return FileType.KOTLIN;
            default:
                return FileType.UNKNOWN;
        }
    }

    mapFileTypeToLanguage(fileType: FileType): string | undefined {
        switch (fileType) {
            case FileType.TEXT:
                return undefined;
            case FileType.MD:
                return "markdown";
            case FileType.JSON:
                return "json";
            case FileType.XML:
                return "xml";
            case FileType.JAVASCRIPT:
                return "javascript";
            case FileType.TYPESCRIPT:
                return "typescript";
            case FileType.PYTHON:
                return "python";
            case FileType.JAVA:
                return "java";
            case FileType.CSHARP:
                return "csharp";
            case FileType.CPP:
                return "cpp";
            case FileType.C:
                return "c";
            case FileType.RUST:
                return "rust";
            case FileType.GO:
                return "go";
            case FileType.RUBY:
                return "ruby";
            case FileType.PHP:
                return "php";
            case FileType.SQL:
                return "sql";
            case FileType.SWIFT:
                return "swift";
            case FileType.DART:
                return "dart";
            case FileType.KOTLIN:
                return "kotlin";
            default:
                return undefined;
        }
    }
}