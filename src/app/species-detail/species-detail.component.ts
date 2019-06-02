import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SpeciesDetail, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species-detail.component.html',
  styleUrls: ['./species-detail.component.css']
})
export class SpeciesDetailComponent implements OnInit {

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
    this.starwarsService.getSpeciesDetails(this.route.snapshot.params.name)
      .then(result => {
        this.speciesDetail = result;
        console.info('speciesDetail: ', result)
      })
  }

  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

}
