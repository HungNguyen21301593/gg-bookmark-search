import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { TreeComponent } from './component/tree/tree.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [HomeComponent, BookmarkComponent,TreeComponent],
  exports: [BookmarkComponent, HomeComponent, TreeComponent]
})
export class HomeModule { }
