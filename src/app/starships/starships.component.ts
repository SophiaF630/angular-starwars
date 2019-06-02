import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Starship, StarshipPage, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starshipList: Starship[] = [];
  starshipPage: StarshipPage;
  page: number;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.page = this.route.snapshot.params.page;

      this.starwarsService.getStarshipList(this.page)
        .then(result => {
          console.log('result:', result);
          this.starshipList = result
        }
        )
        .catch(error => {
          console.error('error: ', error);
        });   
  
        this.starwarsService.getStarshipPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.starshipPage = result
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
  
      this.starwarsService.getSpeciesList(this.page)
        .then(result => {
          console.log('result:', result);
          this.starshipList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
        this.starwarsService.getStarshipPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.starshipPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/starships/page/${this.page}`);
    }
  
    next(): void {
  
      this.page = this.page * 1 + 1;
      this.starwarsService.getStarshipList(this.page)
        .then(result => {
          console.log('result:', result);
          this.starshipList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.starwarsService.getStarshipPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.starshipPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/starships/page/${this.page}`);
    }
}
