import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { CharacterDetail, StarwarsService } from '../starwars.service';


@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})



export class CharacterDetailComponent implements OnInit {

  characterDetail: CharacterDetail;
  //@Input() character: Character;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

 
  goBack(): void {
    this.location.back();
  }

  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

}
