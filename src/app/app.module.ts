import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AttractionListComponent } from './attraction-list/attraction-list.component';

import { AttractionService } from './attraction.service';

@NgModule({
  declarations: [
    AppComponent,
    AttractionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AttractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
