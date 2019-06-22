import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarwarsService, VehicleDetail, Film, Character } from 'src/app/services/starwars.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  vehicleDetail: VehicleDetail;
  films: Film[] = [];
  characters: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.starwarsService.getVehicleDetails(this.route.snapshot.params.name)
      .then(result => {
        this.vehicleDetail = result;
        console.info('vehicleDetail: ', result)

        for (var i = 0, len = result.films.length; i < len; i++) {
          this.starwarsService.getFilmByUrl(result.films[i])
            .then(result => {
              this.films.push(result);
            })
        }

        for (var i = 0, len = result.characters.length; i < len; i++) {
          this.starwarsService.getCharacterByUrl(result.characters[i])
            .then(result => {
              this.characters.push(result);
            })
        }       
      })
  }
  
  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }

  get comments():any{
    return this.localStorageService.getLocalStorage(this.vehicleDetail.url) || [];
  }

  addComments(form:NgForm): void{
    const comments=form.value.comments;
    const url = this.vehicleDetail.url;
    this.localStorageService.storeOnLocalStorage(url, comments);
  }

}
