import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarwarsService, Vehicle, VehiclePage } from 'src/app/services/starwars.service';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicleList: Vehicle[] = [];
  vehiclePage: VehiclePage;
  page: number;

  constructor(
    private starwarsService: StarwarsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

    ngOnInit() {
      this.page = this.route.snapshot.params.page;

      this.starwarsService.getVehicleList(this.page)
        .then(result => {
          console.log('result:', result);
          this.vehicleList = result
        }
        )
        .catch(error => {
          console.error('error: ', error);
        });   

        this.starwarsService.getVehiclePreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.vehiclePage = result
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
  
      this.starwarsService.getVehicleList(this.page)
        .then(result => {
          console.log('result:', result);
          this.vehicleList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
        this.starwarsService.getVehiclePreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.vehiclePage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/vehicles/page/${this.page}`);
    }
  
    next(): void {
  
      this.page = this.page * 1 + 1;
      this.starwarsService.getVehicleList(this.page)
        .then(result => {
          console.log('result:', result);
          this.vehicleList = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.starwarsService.getVehiclePreNextPage(this.page)
        .then(result => {
          console.log('result:', result);
          this.vehiclePage = result
        })
        .catch(error => {
          console.error('error: ', error);
        })
  
      this.router.navigateByUrl(`/vehicles/page/${this.page}`);
    }
  
}
