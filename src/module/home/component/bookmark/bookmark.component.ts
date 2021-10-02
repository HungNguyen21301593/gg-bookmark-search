import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TreeCallbacks, TreeMode, TreeOptions } from 'tree-ngx';
import { NodeItem } from 'tree-ngx/src/model/node-item';
import { TreeService } from '../../service/tree.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {
  allNodes: any[] | undefined;
  rootTree: any;
  filterText!: string;
  bookmarkForm = new FormGroup({
    searchText: new FormControl('')
  });
  localClonedTree: any;
  displayTreeView: any;
  titleLimit = 40;
  callbacks: TreeCallbacks = {
    nameClick: this.nameClick
  };

  options: TreeOptions = {
    mode: TreeMode.SingleSelect,
    checkboxes: false,
    alwaysEmitSelected: false
  };
  constructor(private treeService: TreeService) { }

  async ngOnInit() {
    this.rootTree = await window.chrome.bookmarks.getTree();
    await this.onSearch();
  }

  async onSearch() {
    this.filterText = this.bookmarkForm.value.searchText.toLowerCase();
    this.localClonedTree = JSON.parse(JSON.stringify(this.rootTree[0]));
    this.displayTreeView = this.mapToTreeView(this.localClonedTree.children[0]);
  }

  mapToTreeView(rootTree: any) {
    this.treeService.loopThroughTree(rootTree, () => { }, async (subtree: any) => {
      const getParrent = this.treeService.getParentById(rootTree, subtree.parentId);
      subtree.name = (getParrent ? getParrent.name : '') + subtree.title;
      subtree.item = { url: subtree.url };
    });
    return [rootTree];
  }

  nameClick(node: NodeItem<any>) {
    if (node && node.item && node.item.url) {
      window.open(node.item.url)
    }
  }

  truncateNodeName(name: string) {
    if (name.length < this.titleLimit) {
      return name;
    }
    return name.slice(0, this.titleLimit) + "...";
  }
}

