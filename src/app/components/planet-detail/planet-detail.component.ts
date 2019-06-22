import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetDetail, StarwarsService, Character, Film } from 'src/app/services/starwars.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit {

  planetDetail: PlanetDetail;
  characters: Character[] = [];
  films: Film[] = [];

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.starwarsService.getPlanetDetails(this.route.snapshot.params.name)
      .then(result => {
        this.planetDetail = result;
        console.info('planetDetail: ', result)

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
    return this.localStorageService.getLocalStorage(this.planetDetail.url) || [];
  }

  addComments(form:NgForm): void{
    const comments=form.value.comments;
    const url = this.planetDetail.url;
    this.localStorageService.storeOnLocalStorage(url, comments);
  }


}
