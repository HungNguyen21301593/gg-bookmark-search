import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor() { }
  // Example:
  // this.treeService.loopThroughTree(this.inputRootNode, (node: any) => {
  //   if (node && node.url) {
  //     allUrls.push(node.url);
  //   }
  // });

  loopThroughTree(node: any, actionOnRearNode: (node: any) => any, actionOnEachNode: (node: any) => any) {
    actionOnEachNode(node);
    if (this.isRearNode(node)) {
      actionOnRearNode(node);
    } else {
      this.getAllChildrenNodes(node).forEach((node: any) => {
        this.loopThroughTree(node, actionOnRearNode, actionOnEachNode);
      });
    }
  }

  private getAllChildrenNodes(node: any) {
    if (!node) { return [] };
    return node.children;
  }

  private isRearNode(node: any) {
    return node !== undefined && (!(node.children) || node.children.length == 0);
  }

  getParentById(rootTree: any, id: string): any {
    let result: any[] = [];
    this.loopThroughTree(rootTree, () => { }, (subtree: any) => {
      if (subtree.id === id) {
        result.push(subtree);
      }
    })
    return result[0];
  }
}
