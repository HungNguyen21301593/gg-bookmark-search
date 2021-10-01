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

  loopThroughTree(node: any, actionOnNode: (node: any) => any) {
    if (this.isRearNode(node)) {
      return actionOnNode(node);
    } else {
      this.getAllChildrenNodes(node).forEach((node: any) => {
        this.loopThroughTree(node, actionOnNode);
      });
    }
  }

  private getAllChildrenNodes(node: any) {
    if (!node) {return []};
    return node.children;
  }

  private isRearNode(node: any) {
    return node !== undefined && (!(node.children) || node.children.length == 0);
  }

  isTopNodeMatchedSearchText(subTree: any, searchText: string) {
    return subTree && subTree.title && subTree.title.toString().toLowerCase().includes(searchText);
  }

  doesAnyChildrenNodeMatch(tree: any, searchText: string) {
    let matchedNodeIds: any[] = [];
    this.loopThroughTree(tree, (subTree: any) => {
      if (!this.isTopNodeMatchedSearchText(subTree, searchText)) {
        matchedNodeIds.push(subTree.id);
      }
    });
    return matchedNodeIds.length !== 0;
  }
}
