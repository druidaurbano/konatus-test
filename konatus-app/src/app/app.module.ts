import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [ApiService],
  bootstrap: []
})
export class AppModule { }
