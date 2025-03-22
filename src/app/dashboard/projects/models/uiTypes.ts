export enum SpecificationRenderType {
    UI = "UI",
    JSON = "JSON",
    // YAML = "YAML"
}

// UI Specification rendering
export interface SectionConfig {
    title: string;
    fields: FieldConfig[];
}

export interface FieldConfig {
    label: string;
    key: string;
    type: "text" | "array" | "enum" | "object";
    options?: any[];
    edit?: boolean;
}