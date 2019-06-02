import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { StarshipDetail, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.css']
})
export class StarshipDetailComponent implements OnInit {

  starshipDetail: StarshipDetail;
  //@Input() character: Character;

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    //var name = this.route.snapshot.params.name;
    //var url = this.starwarsService.getCharacterList.findbyName(name).url;
    this.starwarsService.getStarshipDetails(this.route.snapshot.params.name)
      .then(result => {
        this.starshipDetail = result;
        console.info('starshipDetail: ', result)
      })
  }
  
  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }
}
