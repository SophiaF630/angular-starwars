import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FilmDetail, StarwarsService, Character, Species, Starship, Planet, Vehicle } from 'src/app/services/starwars.service';
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  filmDetail: FilmDetail;
  species: Species[] = [];
  planets: Planet[] = [];
  characters: Character[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.starwarsService.getFilmDetails(this.route.snapshot.params.title)
      .then(result => {
        this.filmDetail = result;
        console.info('filmDetail: ', result)

        for (var i = 0, len = result.species.length; i < len; i++) {
          this.starwarsService.getSpeciesByUrl(result.species[i])
            .then(result => {
              this.species.push(result);
            })
        }

        for (var i = 0, len = result.planets.length; i < len; i++) {
        this.starwarsService.getPlanetByUrl(result.planets[i])
          .then(result => {
            this.planets.push(result);
          })
        }

        for (var i = 0, len = result.starships.length; i < len; i++) {
          this.starwarsService.getStarshipByUrl(result.starships[i])
            .then(result => {
              this.starships.push(result);
            })
        }

        for (var i = 0, len = result.vehicles.length; i < len; i++) {
          this.starwarsService.getVehicleByUrl(result.vehicles[i])
            .then(result => {
              this.vehicles.push(result);
            })
        }

        for (var i = 0, len = result.characters.length; i < len; i++) {
          this.starwarsService.getCharacterByUrl(result.characters[i])
            .then(result => {
              this.characters.push(result);
            })
        }

      })
  }


  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }


}
