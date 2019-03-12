import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, flatMap, toArray } from 'rxjs/operators';

export interface Character {
    id: number;
    name: string;
}

export interface CharacterDetail {
    id: number;
    name: string;
}

@Injectable()
export class StarwarsService {
    constructor(private http: HttpClient,
        @Inject('appKey') private appKey) { }

    getCharacterList(): Promise<Character[]> {
        const params = new HttpParams()
            .set('limit', 20 + '')
            .set('apikey', this.appKey);
        return (
            this.http.get<Character[]>('https://swapi.co/api/people', { params })
                .pipe(
                    map(v => v['data']['results']),
                    flatMap(v => v),
                    map((v: any) => {
                        return (<Character>{ id: v.id, name: v.name });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }
    getCharacterDetails(id: number): Promise<CharacterDetail> {
        const params = new HttpParams()
            .set('apikey', this.appKey);
        return (
            this.http.get<CharacterDetail>(`https://swapi.co/api/people/${id}`, { params })
                .pipe(
                    map(v => v['data']['results'][0]),
                    map((v: any) => {
                        return (<CharacterDetail>{
                            id: v.id,
                            name: v.name
                        })
                    })
                )
                .toPromise()
        );
    }
}