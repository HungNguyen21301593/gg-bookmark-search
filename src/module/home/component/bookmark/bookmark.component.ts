import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor() { }

  async ngOnInit() {
    this.rootNode = await window.chrome.bookmarks.getTree();
    this.displayTree = this.rootNode;
  }

  async onSearch() {
    const test = this.bookmarkForm.get('searhText');
    this.displayTree = this.rootNode;
  }
}
