import { Location } from '@angular/common';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/classes/comment';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { Character, Film, StarshipDetail, StarwarsService } from 'src/app/services/starwars.service';
import { NgForm } from '@angular/forms';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.css']
})

export class StarshipDetailComponent implements OnInit {

  starshipDetail: StarshipDetail;
  films: Film[] = [];
  characters: Character[] = [];
  comment: Comment;

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
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
      })

  }

  get comments():any{
    return this.localStorageService.getLocalStorage(this.starshipDetail.url) || [];
  }

  addComments(form:NgForm): void{
    const comments=form.value.comments;
    const url = this.starshipDetail.url;
    this.localStorageService.storeOnLocalStorage(url, comments);
    //this.localStorageService.addComments(url, comments);
  }
  

  goBack() {
    this.location.back();
  }
}
