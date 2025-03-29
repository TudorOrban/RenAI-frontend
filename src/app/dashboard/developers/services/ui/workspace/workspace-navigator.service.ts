import { Injectable } from "@angular/core";
import { WorkspaceTreeUI } from "../../../models/UITypes";
import { WorkspaceNodeUI } from "../../../models/UITypes";

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