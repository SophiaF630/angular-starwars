import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarwarsService, VehicleDetail } from 'src/app/services/starwars.service';


@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  vehicleDetail: VehicleDetail;
  //@Input() character: Character;

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    //var name = this.route.snapshot.params.name;
    //var url = this.starwarsService.getCharacterList.findbyName(name).url;
    this.starwarsService.getVehicleDetails(this.route.snapshot.params.name)
      .then(result => {
        this.vehicleDetail = result;
        console.info('vehicleDetail: ', result)
      })
  }
  
  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

}
