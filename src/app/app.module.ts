import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';

// Custom modules
import { AuthModule } from './auth/auth.module';
import { CsvModule } from './csv/csv.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PokemonsModule } from './pokemons/pokemons.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AuthModule,
    CsvModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    Title, // on fournis le service 'Title' à l'ensemble de l'application
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
