import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { Character, CharacterPage, StarwarsService } from 'src/app/services/starwars.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = [];
  characterPage: CharacterPage;
  //selectedCharacter: Character;
  page: number;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit() {
    this.page = this.route.snapshot.params.page;

    this.starwarsService.getCharacterList(this.page)
      .then(result => {
        console.log('result:', result);
        this.characters = result
      }
      )
      .catch(error => {
        console.error('error: ', error);
      });   

      this.starwarsService.getCharacterPreNextPage(this.page)
      .then(result => {
        console.log('result:', result);
        this.characterPage = result
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

    this.starwarsService.getCharacterList(this.page)
      .then(result => {
        console.log('result:', result);
        this.characters = result
      })
      .catch(error => {
        console.error('error: ', error);
      })

      this.starwarsService.getCharacterPreNextPage(this.page)
      .then(result => {
        console.log('result:', result);
        this.characterPage = result
      })
      .catch(error => {
        console.error('error: ', error);
      })

    this.router.navigateByUrl(`/characters/page/${this.page}`);
  }

  next(): void {

    this.page = this.page * 1 + 1;
    this.starwarsService.getCharacterList(this.page)
      .then(result => {
        console.log('result:', result);
        this.characters = result
      })
      .catch(error => {
        console.error('error: ', error);
      })

    this.starwarsService.getCharacterPreNextPage(this.page)
      .then(result => {
        console.log('result:', result);
        this.characterPage = result
      })
      .catch(error => {
        console.error('error: ', error);
      })

    this.router.navigateByUrl(`/characters/page/${this.page}`);
  }

  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

}

