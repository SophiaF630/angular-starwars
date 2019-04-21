import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FilmDetail, StarwarsService } from '../starwars.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  filmDetail: FilmDetail;

  constructor(
    private route: ActivatedRoute,
    private starwarsService: StarwarsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.starwarsService.getFilmDetails(this.route.snapshot.params.title)
      .then(result => {
        this.filmDetail = result;
        console.info('filmDetail: ', result)
      })
  }


  back() {
    //this.router.navigate(['/']);
    this.location.back();
  }


}
