import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film, StarwarsService } from 'src/app/services/starwars.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: Film[] = [];
  //selectedCharacter: Character;
  page: number;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.page = this.route.snapshot.params.page;
      //this.page = 1;
      this.starwarsService.getFilmList(this.page)
        .then(result => {
          console.log('result:', result);
          this.films = result
        }
        )
        .catch(error => {
          console.error('error: ', error);
        });
    }
  
    goBack(): void {
      this.location.back();
    }
  
    previous(): void {
      if (this.page > 1) {
        this.page = this.page*1 - 1;
      }
  
      //ngOnInit();
      this.starwarsService.getFilmList(this.page)
        .then(result => {
          console.log('result:', result);
          this.films = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/films/page/${this.page}`);     
    }
  
    next(): void {
      
      this.page = this.page*1 + 1;
      this.starwarsService.getFilmList(this.page)
        .then(result => {
          console.log('result:', result);
          this.films = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
        
      this.router.navigateByUrl(`/films/page/${this.page}`);
    }

}
