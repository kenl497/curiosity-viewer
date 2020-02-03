import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CuriosityService } from './services/curiosity.service';
import { CameraCardComponent } from './components/camera-card/camera-card.component';
import { CameraSelectComponent } from './components/camera-select/camera-select.component';
import { CameraListComponent } from './components/camera-list/camera-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraCardComponent,
    CameraSelectComponent,
    CameraListComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CuriosityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
