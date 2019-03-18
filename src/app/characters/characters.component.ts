import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Character, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = []
  selectedCharacter: Character;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location) { }



  ngOnInit() {
    this.starwarsService.getCharacterList()
    .then(result => {
      console.log('result:', result);
      this.characters = result}
      )
    .catch(error => {
      console.error('error: ', error);
    });
  }

  onSelect(character: Character): void {
    this.selectedCharacter = character;
  }
  // getCharacters(): void {
  //   this.characterService.getCharacters()
  //     .subscribe(characters => this.characters = characters);
  // }

  goBack(): void {
    this.location.back();
  }

}

