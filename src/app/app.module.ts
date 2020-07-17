import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ 
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
