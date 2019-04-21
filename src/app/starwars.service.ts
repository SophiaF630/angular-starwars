import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, flatMap, toArray } from 'rxjs/operators';
import { Router, UrlTree, UrlSegment, UrlSegmentGroup, PRIMARY_OUTLET, DefaultUrlSerializer, RouterState, ActivatedRoute } from '@angular/router';

export interface Character {
    url: string;
    name: string;

}

export interface CharacterDetail {
    url: string;
    name: string;
    birth_year: string;
    eye_color: string;

}

export interface Film {
    url: string;
    title: string;
}

@Injectable()
export class StarwarsService {
    // constructor(private http: HttpClient,
    //     @Inject('appKey') private appKey) { }
    tree: UrlTree;
    fragment = '';
    queryParams = {};
    // primary outlet
    primary: UrlSegmentGroup;
    // secondary outlet
    sidebar: UrlSegmentGroup;

    constructor(
        private http: HttpClient,
        private router: Router) { }

    getCharacterList(page: number): Promise<Character[]> {
        return (
            this.http.get<Character[]>(`https://swapi.co/api/people/?page=${page}`)
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {                       
                        return (<Character>{ url: v.url, name: v.name });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }


    getCharacterDetails(name: string): Promise<CharacterDetail> {
        return (
            this.http.get<CharacterDetail>(`https://swapi.co/api/people/?search=${name}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        var paras  = v.url.split('/');
                        //paras = paras.reverse();
                        var id = paras[5];
                        var imageurl = '/assets/img/characters/' + id + '.jpg';
                        return (<CharacterDetail>{
                            name: v.name,
                            birth_year: v.birth_year,
                            species: v.species,
                            gender: v.gender,
                            height: v.height,
                            mass: v.mass,
                            hair_color: v.hair_color,
                            skin_color: v.skin_color,
                            eye_color: v.eye_color,
                            homeworld: v.homeworld,
                            films: v.films,
                            starships: v.starships,
                            vehicles: v.vehicles,
                            url: v.url,
                            image: imageurl,
                        })
                    })
                )
                .toPromise()
        );
    }


    getFilmList(page: number): Promise<Film[]> {
        return (
            this.http.get<Film[]>(`https://swapi.co/api/films/?page=${page}`)
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {                       
                        return (<Film>{ url: v.url, title: v.title });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }

   
}

