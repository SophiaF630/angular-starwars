import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { StarwarsService } from './services/starwars.service';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FilmsComponent } from './components/films/films.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { StarshipDetailComponent } from './components/starship-detail/starship-detail.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { SpeciesComponent } from './components/species/species.component';
import { SpeciesDetailComponent } from './components/species-detail/species-detail.component';
import { PlanetDetailComponent } from './components/planet-detail/planet-detail.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from './services/localStorage.service';


const ROUTES: Route[] = [
  { path: 'home', component: HomeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    CharacterDetailComponent,
    HomeComponent,
    FilmsComponent,
    FilmDetailComponent,
    StarshipDetailComponent,
    StarshipsComponent,
    SpeciesComponent,
    SpeciesDetailComponent,
    PlanetDetailComponent,
    PlanetsComponent,
    VehiclesComponent,
    VehicleDetailComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MaterialModule, 
    MatFormFieldModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    StorageServiceModule
  ],
  providers: [StarwarsService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
