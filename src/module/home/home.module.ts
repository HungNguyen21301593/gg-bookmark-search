import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeNgxModule } from 'tree-ngx';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TreeNgxModule,
    ContextMenuModule.forRoot(),
    FormsModule,
    FlexLayoutModule
  ],
  declarations: [HomeComponent, BookmarkComponent],
  exports: [BookmarkComponent, HomeComponent]
})
export class HomeModule { }
