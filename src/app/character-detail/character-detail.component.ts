import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CharacterDetail, SpeciesDetail, StarwarsService } from '../starwars.service';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})



export class CharacterDetailComponent implements OnInit {

  characterDetail: CharacterDetail;
  speciesDetail: SpeciesDetail;
  //@Input() character: Character;

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    //var name = this.route.snapshot.params.name;
    //var url = this.starwarsService.getCharacterList.findbyName(name).url;
    this.starwarsService.getCharacterDetails(this.route.snapshot.params.name)
      .then(result => {
        this.characterDetail = result;
        console.info('characterDetail: ', result)
      })
  }

  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

}
