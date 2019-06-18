import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetDetail, StarwarsService } from 'src/app/services/starwars.service';


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
