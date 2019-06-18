import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Species, SpeciesPage, StarwarsService } from 'src/app/services/starwars.service';


@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  speciesList: Species[] = [];
  //selectedCharacter: Character;
  speciesPage: SpeciesPage;
  page: number;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.page = this.route.snapshot.params.page;

      this.starwarsService.getSpeciesList(this.page)
        .then(result => {
          console.log('result:', result);
          this.speciesList = result
        }
        )
        .catch(error => {
          console.error('error: ', error);
        });   
  
        this.starwarsService.getSpeciesPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.speciesPage = result
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
          this.speciesList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
        this.starwarsService.getSpeciesPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.speciesPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/species/page/${this.page}`);
    }
  
    next(): void {
  
      this.page = this.page * 1 + 1;
      this.starwarsService.getSpeciesList(this.page)
        .then(result => {
          console.log('result:', result);
          this.speciesList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.starwarsService.getSpeciesPreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.speciesPage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/species/page/${this.page}`);
    }
}
