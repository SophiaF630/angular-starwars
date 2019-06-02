import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Planet, PlanetPage, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  planetList: Planet[] = [];
  //selectedCharacter: Character;
  planetPage: PlanetPage;
  page: number;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.page = this.route.snapshot.params.page;

      this.starwarsService.getPlanetList(this.page)
        .then(result => {
          console.log('result:', result);
          this.planetList = result
        }
        )
        .catch(error => {
          console.error('error: ', error);
        });   
  
        this.starwarsService.getSpeciesPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.planetPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
    }
  
    goBack(): void {
      this.location.back();
    }
  
    previous(): void {
      if (this.page > 1) {
        this.page = this.page * 1 - 1;
      }
  
      this.starwarsService.getPlanetList(this.page)
        .then(result => {
          console.log('result:', result);
          this.planetList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
        this.starwarsService.getPlanetPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.planetPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/planets/page/${this.page}`);
    }
  
    next(): void {
  
      this.page = this.page * 1 + 1;
      this.starwarsService.getPlanetList(this.page)
        .then(result => {
          console.log('result:', result);
          this.planetList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.starwarsService.getPlanetPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.planetPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/planets/page/${this.page}`);
    }

}
