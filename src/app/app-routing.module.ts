import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { SpeciesComponent } from './species/species.component';
import { SpeciesDetailComponent } from './species-detail/species-detail.component';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'characterdetail/:name', component: CharacterDetailComponent },
  { path: 'characters/page/:page', component: CharactersComponent },
  { path: 'filmdetail/:title', component: FilmDetailComponent },
  { path: 'films/page/:page', component: FilmsComponent },
  { path: 'speciesdetail/:name', component: SpeciesDetailComponent },
  { path: 'species/page/:page', component: SpeciesComponent },
  { path: 'starshipdetail/:name', component: StarshipDetailComponent },
  { path: 'starships/page/:page', component: StarshipsComponent },
  { path: 'vehicledetail/:name', component: VehicleDetailComponent },
  { path: 'vehicles/page/:page', component: VehiclesComponent },
  { path: 'planetdetail/:name', component: PlanetDetailComponent },
  { path: 'planets/page/:page', component: PlanetsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

