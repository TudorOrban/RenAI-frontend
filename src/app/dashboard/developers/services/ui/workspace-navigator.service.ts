import { Injectable } from "@angular/core";
import { WorkspaceNodeUI, WorkspaceTreeUI } from "../../models/RenaiDeveloper";

@Injectable({
    providedIn: "root"
})
export class WorkspaceNavigatorService {

    determinePaths(tree?: WorkspaceTreeUI): void {
        if (!tree) return;

        this.determinePathsRecursively(tree.root, "");
    }

    determinePathsRecursively(node: WorkspaceNodeUI, currentPath: string): void {
        node.children?.forEach((child) => {
            const previousPath = currentPath !== "" ? currentPath + "/" : "";
            const childPath = previousPath + child.name;
            child.path = childPath;
            this.determinePathsRecursively(child, childPath);
        });
    }
}