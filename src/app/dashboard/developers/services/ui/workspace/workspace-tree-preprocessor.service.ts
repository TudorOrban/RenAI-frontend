import { Injectable } from "@angular/core";
import { WorkspaceTreeUI } from "../../../models/UITypes";
import { WorkspaceNodeUI } from "../../../models/UITypes";

/*
 * A util service for preprocessing the workspace tree before rendering (depth-limiting, sorting, constructing paths)
 */
@Injectable({
    providedIn: "root"
})
export class WorkspaceTreePreprocessorService {

    preprocessTree(tree?: WorkspaceTreeUI): void {
        if (!tree) return;

        this.preprocessNodesRecursively(tree.root, "", 0);
    }

    preprocessNodesRecursively(node: WorkspaceNodeUI, currentPath: string, depth: number): void {
        if (depth < 3 && !node.collapsed) {
            node.isExpanded = true;
        }
        if (!node.children) {
            return;
        }
        
        // Ensure directories come before files
        node.children.sort((a, b) => {
            if (a.directory && !b.directory) {
                return -1;
            } else if (!a.directory && b.directory) {
                return 1; 
            } else {
                return 0; 
            }
        });

        // Construct paths
        node.children.forEach((child) => {
            const previousPath = currentPath !== "" ? currentPath + "/" : "";
            const childPath = previousPath + child.name;
            child.path = childPath;

            this.preprocessNodesRecursively(child, childPath, depth + 1);
        });
    }
}