import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from '../localStorage.service';
import { StarshipDetail, StarwarsService, Character, Film } from '../starwars.service';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.css']
})

export class StarshipDetailComponent implements OnInit {

  starshipDetail: StarshipDetail;
  films: Film[] = [];
  characters: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private starwarsService: StarwarsService,
    private location: Location,
    private localStorageService: LocalStorageService
    
  ) { }

  ngOnInit() {
    this.starwarsService.getStarshipDetails(this.route.snapshot.params.name)
      .then(result => {
        this.starshipDetail = result;
        console.info('starshipDetail: ', result)     
        console.log('film: ', result.films)

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

        const url = "url"
        const comments = "new";
        this.localStorageService.storeOnLocalStorage(url, comments);

      })
  }

  goBack() {
    this.location.back();
  }
}
