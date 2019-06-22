import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, Film, Planet, SpeciesDetail, StarwarsService } from 'src/app/services/starwars.service';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/localStorage.service';


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
    private location: Location,
    private localStorageService: LocalStorageService
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
  get comments():any{
    return this.localStorageService.getLocalStorage(this.speciesDetail.url) || [];
  }

  addComments(form:NgForm): void{
    const comments=form.value.comments;
    const url = this.speciesDetail.url;
    this.localStorageService.storeOnLocalStorage(url, comments);
  }
}
