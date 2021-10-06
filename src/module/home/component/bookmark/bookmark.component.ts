import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContextMenuComponent } from 'ngx-contextmenu';
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
  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];
  @ViewChild(ContextMenuComponent) public basicMenu!: ContextMenuComponent;

  showMessage(message: any) {
    console.log(message);
  }

  options: TreeOptions = {
    mode: TreeMode.SingleSelect,
    checkboxes: false,
    alwaysEmitSelected: false
  };
  constructor(private treeService: TreeService) { }

  async ngOnInit() {
    await this.reloadTree();
  }

  async reloadTree() {
    this.rootTree = await window.chrome.bookmarks.getTree();
    this.localClonedTree = JSON.parse(JSON.stringify(this.rootTree[0]));
    this.displayTreeView = this.mapToTreeView(this.localClonedTree.children[0]);
    this.onSearch();
  }

  async onSearch() {
    const text = this.bookmarkForm.value.searchText.toLowerCase();
    this.filterText = text;
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
      window.open(node.item.url, "_blank")
    }
  }

  truncateNodeName(name: string) {
    if (name.length < this.titleLimit) {
      return name;
    }
    return name.slice(0, this.titleLimit) + "...";
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  drag(event: any, node: any) {
    event.dataTransfer.setData("text", node.id);
  }

  async drop(event: any, desNode: any) {
    if (desNode.url) {
      return;
    }
    const srcNodeId = event.dataTransfer.getData("text");
    window.chrome.bookmarks.move(srcNodeId, { parentId: desNode.id });
    this.reloadTree();
  }

  updateNode(item: any) {
    if (item.url && item.newUrl !== item.url) {
      window.chrome.bookmarks.update(item.id, { url: item.newUrl })
      item.url = item.newUrl;
    }
    if (item.newTitle && item.newTitle !== item.title) {
      window.chrome.bookmarks.update(item.id, { title: item.newTitle })
      item.title = item.newTitle;
    }
  }

  sidemenuOpenned(event: any) {
    event.item.newTitle = event.item.title;
    event.item.newUrl = event.item.url;
  }
}

