import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TreeService } from '../../service/tree.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  allNodes: any[] | undefined;
  rootNode: any;
  bookmarkForm = new FormGroup({
    searchText: new FormControl('')
  });
  displayTree: any;
  constructor(private treeService: TreeService) { }

  async ngOnInit() {
    this.rootNode = await window.chrome.bookmarks.getTree();
    this.displayTree = this.rootNode[0];
  }

  async onSearch() {
    const searhText = this.bookmarkForm.value.searchText.toLowerCase();
    this.displayTree = JSON.parse(JSON.stringify(this.rootNode[0]))
    this.pruneTree(this.displayTree, searhText);
  }

  pruneTree(rootTree: any, searchText: string) {
    this.treeService.loopThroughTree(rootTree, (subtree: any) => {
      if (this.treeService.doesAnyChildrenNodeMatch(subtree, searchText)) {
        subtree.title = undefined;
        subtree.url = undefined;
      }
    });
  }
}

