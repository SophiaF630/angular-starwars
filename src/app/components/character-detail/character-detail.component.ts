import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CharacterDetail, Species, StarwarsService, Starship, Planet, Film, Vehicle } from 'src/app/services/starwars.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})



export class CharacterDetailComponent implements OnInit {

  characterDetail: CharacterDetail;
  species: Species[] = [];
  planet: Planet;
  films: Film[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];


  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {

    this.starwarsService.getCharacterDetails(this.route.snapshot.params.name)
      .then(result => {

        this.characterDetail = result;
        console.info('characterDetail: ', result);

        for (var i = 0, len = result.species.length; i < len; i++) {
          this.starwarsService.getSpeciesByUrl(result.species[i])
            .then(result => {
              this.species.push(result);
            })
        }

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

      });
  }

  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

  get comments():any{
    return this.localStorageService.getLocalStorage(this.characterDetail.url) || [];
  }

  addComments(form:NgForm): void{
    const comments=form.value.comments;
    const url = this.characterDetail.url;
    this.localStorageService.storeOnLocalStorage(url, comments);
  }

}
