import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { FilmsComponent } from './films/films.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'characterdetail/:name', component: CharacterDetailComponent },
  { path: 'characters/page/:page', component: CharactersComponent },
  { path: 'filmdetail/:title', component: FilmDetailComponent },
  { path: 'films/page/:page', component: FilmsComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

