import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SpeciesDetail, StarwarsService, Character, Planet, Film } from '../starwars.service';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.css']
})
export class SpeciesDetailComponent implements OnInit {

  speciesDetail: SpeciesDetail;
  planet: Planet;
  films: Film[] = [];
  characters: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.starwarsService.getSpeciesDetails(this.route.snapshot.params.name)
      .then(result => {
        this.speciesDetail = result;
        console.info('speciesDetail: ', result)

        this.starwarsService.getPlanetByUrl(result.planet)
        .then(result => {
          this.planet = result;
        })

      for (var i = 0, len = result.films.length; i < len; i++) {
        this.starwarsService.getFilmByUrl(result.films[i])
          .then(result => {
            this.films.push(result);
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
