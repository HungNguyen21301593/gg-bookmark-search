import { Component, Input, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { TreeService } from '../../service/tree.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  @Input() inputRootNode: any;
  rootNodeAsJsonString: string | undefined;
  items!: TreeviewItem[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  constructor(private treeService: TreeService) { }
  ngOnInit() {
    this.items = [new TreeviewItem({
      text: 'Children', value: 1, collapsed: false, checked: false, disabled: true, children: [
        { text: 'Baby 3-5', value: 11 },
        { text: 'Baby 6-8', value: 12 },
        { text: 'Baby 9-12', value: 13 }
      ]
    })];
  }

  render() {
    let allUrls: any[] = [];
    this.treeService.loopThroughTree(this.inputRootNode, (node: any) => {
      if (node && node.title) {
        allUrls.push(node.title);
      }
    });
    return JSON.stringify(allUrls);
  }
}
