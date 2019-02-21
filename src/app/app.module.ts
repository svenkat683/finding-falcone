import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FindingFalconeComponent } from "./components/finding-falcone/finding-falcone.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DestinationComponent } from "./components/destination/destination.component";
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    FindingFalconeComponent,
    HeaderComponent,
    FooterComponent,
    DestinationComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
