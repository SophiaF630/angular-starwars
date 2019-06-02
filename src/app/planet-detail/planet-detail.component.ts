import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlanetDetail, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit {

  planetDetail: PlanetDetail;
  //@Input() character: Character;

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    //var name = this.route.snapshot.params.name;
    //var url = this.starwarsService.getCharacterList.findbyName(name).url;
    this.starwarsService.getPlanetDetails(this.route.snapshot.params.name)
      .then(result => {
        this.planetDetail = result;
        console.info('planetDetail: ', result)
      })
  }
  
  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

}
