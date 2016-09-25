import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AttractionListComponent } from './attraction-list/attraction-list.component';

import { AttractionService } from './attraction.service';

import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdListModule } from '@angular2-material/list';
import { MdButtonModule } from '@angular2-material/button';

@NgModule({
  declarations: [
    AppComponent,
    AttractionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdToolbarModule.forRoot(),
    MdListModule.forRoot(),
    MdButtonModule.forRoot()
  ],
  providers: [AttractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
