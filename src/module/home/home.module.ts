import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeNgxModule } from 'tree-ngx';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TreeNgxModule
  ],
  declarations: [HomeComponent, BookmarkComponent],
  exports: [BookmarkComponent, HomeComponent]
})
export class HomeModule { }
