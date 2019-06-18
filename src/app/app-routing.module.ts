import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { SpeciesComponent } from './components/species/species.component';
import { SpeciesDetailComponent } from './components/species-detail/species-detail.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipDetailComponent } from './components/starship-detail/starship-detail.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { PlanetsComponent } from './components/planets/planets.component';
import { PlanetDetailComponent } from './components/planet-detail/planet-detail.component';
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

