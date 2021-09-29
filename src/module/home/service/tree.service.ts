import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor() { }

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
    return node.chilren;
  }

  private isRearNode(node: any) {
    return !node || !node.childrenNodes || node.childrenNodes.length == 0;
  }
}
