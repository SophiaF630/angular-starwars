import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

//import { Character } from '../character';
import { CharacterService } from '../character.service';
import { Character, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})



export class CharacterDetailComponent implements OnInit {

  character: Character;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.starwarsService.getCharacterDetails(this.route.snapshot.params.id)
      .then(result => {
        this.character = result;
        console.info('character: ', result)
      })
  }

 
  goBack(): void {
    this.location.back();
  }

}
