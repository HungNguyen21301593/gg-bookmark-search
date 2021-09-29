import { Component, Input, OnInit } from '@angular/core';
import { TreeService } from '../../service/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() inputRootNode: any;
  rootNodeAsJsonString: string | undefined;
  constructor(private treeService: TreeService) { }
  ngOnInit() {
  }

  render() {
    let allUrls: any[];
    this.treeService.loopThroughTree(this.inputRootNode, (node: any) => {
      allUrls.push(node.url);
    })
    return JSON.stringify(this.inputRootNode);
  }
}
