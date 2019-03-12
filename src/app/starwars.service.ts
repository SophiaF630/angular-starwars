import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, flatMap, toArray } from 'rxjs/operators';

export interface Character {
    url: string;
    name: string;
    id: number;
    
}

export interface CharacterDetail {
    url: string;
    name: string;  
    birth_year: string;
    eye_color: string;
    
}

@Injectable()
export class StarwarsService {
    // constructor(private http: HttpClient,
    //     @Inject('appKey') private appKey) { }
    constructor(
        private http: HttpClient) { }

    getCharacterList(): Promise<Character[]> {
        return (
            this.http.get<Character[]>('https://swapi.co/api/people')
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {
                        var urlarray = v.url.split('/');
                        return (<Character>{ url: v.url, name: v.name, id: urlarray[urlarray.length-1] });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }
    getCharacterDetails(id: number): Promise<CharacterDetail> {
        return (
            this.http.get<CharacterDetail>(`https://swapi.co/api/people/${id}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        return (<CharacterDetail>{
                            name: v.name,
                            birth_year: v.birth_year,
                            eye_color: v.eye_color,
                            url: v.url,
                        })
                    })
                )
                .toPromise()
        );
    }
}


//`https://swapi.co/api/people/${id}`