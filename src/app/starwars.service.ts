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
export interface CharacterPage {
    count: number;
    next: string;
    previous: string;

}

export interface Film {
    url: string;
    title: string;
}

export interface FilmDetail {
    title: string;
    url: string;

}

export interface Species{
    url: string;
    name: string;
}

export interface SpeciesDetail{
    url: string;
    name: string;
}

export interface SpeciesPage {
    count: number;
    next: string;
    previous: string;

}

export interface Starship{
    url: string;
    name: string;
}

export interface StarshipDetail{
    url: string;
    name: string;
}

export interface StarshipPage {
    count: number;
    next: string;
    previous: string;

}

export interface Vehicle{
    url: string;
    name: string;
}

export interface VehicleDetail{
    url: string;
    name: string;
}

export interface VehiclePage {
    count: number;
    next: string;
    previous: string;

}

export interface Planet{
    url: string;
    name: string;
}

export interface PlanetDetail{
    url: string;
    name: string;
}

export interface PlanetPage {
    count: number;
    next: string;
    previous: string;

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
                        var paras = v.url.split('/');
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

    getCharacterPreNextPage(page: number): Promise<CharacterPage> {
        return (
            this.http.get<CharacterPage[]>(`https://swapi.co/api/people/?page=${page}`)
                .pipe(
                    map(v => v),
                    map((v: any) => {
                        return (<CharacterPage>{ count: v.count, next: v.next, previous: v.previous })
                    })
                )
                .toPromise()
        )
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

    getFilmDetails(title: string): Promise<FilmDetail> {
        return (
            this.http.get<FilmDetail>(`https://swapi.co/api/films/?search=${title}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        //var paras = v.url.split('/');
                        //paras = paras.reverse();
                        //var id = paras[5];
                        //var imageurl = '/assets/img/films/' + id + '.jpg';
                        return (<FilmDetail>{
                            title: v.title,
                            episode_id: v.episode_id,
                            opening_crawl: v.opening_crawl,
                            director: v.director,
                            producer: v.producer,
                            release_date: v.release_date,
                            species: v.species,
                            starships: v.starships,
                            vehicles: v.vehicles,
                            characters: v.characters,
                            planets: v.planets,
                            url: v.url,
                        })
                    })
                )
                .toPromise()
        );
    }

    getSpeciesList(page: number): Promise<Species[]> {
        return (
            this.http.get<Species[]>(`https://swapi.co/api/species/?page=${page}`)
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {
                        return (<Species>{ url: v.url, name: v.name });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }

    getSpeciesDetails(name: string): Promise<SpeciesDetail> {
        return (
            this.http.get<SpeciesDetail>(`https://swapi.co/api/species/?search=${name}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        //var paras = v.url.split('/');
                        //paras = paras.reverse();
                        //var id = paras[5];
                        //var imageurl = '/assets/img/films/' + id + '.jpg';
                        return (<SpeciesDetail>{
                            name: v.name,
                            classification: v.classification,
                            designation: v.designation,
                            average_height: v.average_height,
                            average_lifespan: v.average_lifespan ,
                            eye_colors: v.eye_colors,
                            hair_colors: v.hair_colors,
                            skin_colors: v.skin_colors,
                            language: v.language,
                            homeworld: v.homeworld,
                            people: v.people,
                            films: v.films,
                            url: v.url,                           
                        })
                    })
                )
                .toPromise()
        );
    }

    getSpeciesPreNextPage(page: number): Promise<SpeciesPage> {
        return (
            this.http.get<SpeciesPage[]>(`https://swapi.co/api/species/?page=${page}`)
                .pipe(
                    map(v => v),
                    map((v: any) => {
                        return (<SpeciesPage>{ count: v.count, next: v.next, previous: v.previous })
                    })
                )
                .toPromise()
        )
    }

    getStarshipList(page: number): Promise<Starship[]> {
        return (
            this.http.get<Starship[]>(`https://swapi.co/api/starships/?page=${page}`)
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {
                        return (<Starship>{ url: v.url, name: v.name });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }

    getStarshipDetails(name: string): Promise<StarshipDetail> {
        return (
            this.http.get<StarshipDetail>(`https://swapi.co/api/starships/?search=${name}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        //var paras = v.url.split('/');
                        //paras = paras.reverse();
                        //var id = paras[5];
                        //var imageurl = '/assets/img/films/' + id + '.jpg';
                        return (<StarshipDetail>{
                            name: v.name,
                            model: v.model,
                            starship_class: v.starship_class,
                            manufacturer: v.manufacturer,
                            cost_in_credits: v.cost_in_credits ,
                            length: v.length,
                            crew: v.crew,
                            passengers: v.passengers,
                            max_atmosphering_speed: v.max_atmosphering_speed,
                            hyperdrive_rating: v.hyperdrive_rating,
                            MGLT: v.MGLT,
                            cargo_capacity: v.cargo_capacity,
                            consumables: v.consumables,
                            films: v.films,
                            pilots: v.pilots,
                            url: v.url                           
                        })
                    })
                )
                .toPromise()
        );
    }

    getStarshipPreNextPage(page: number): Promise<StarshipPage> {
        return (
            this.http.get<StarshipPage[]>(`https://swapi.co/api/starships/?page=${page}`)
                .pipe(
                    map(v => v),
                    map((v: any) => {
                        return (<StarshipPage>{ count: v.count, next: v.next, previous: v.previous })
                    })
                )
                .toPromise()
        )
    }

    getVehicleList(page: number): Promise<Vehicle[]> {
        return (
            this.http.get<Vehicle[]>(`https://swapi.co/api/vehicles/?page=${page}`)
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {
                        return (<Vehicle>{ url: v.url, name: v.name });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }

    getVehicleDetails(name: string): Promise<VehicleDetail> {
        return (
            this.http.get<VehicleDetail>(`https://swapi.co/api/vehicles/?search=${name}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        //var paras = v.url.split('/');
                        //paras = paras.reverse();
                        //var id = paras[5];
                        //var imageurl = '/assets/img/films/' + id + '.jpg';
                        return (<VehicleDetail>{
                            name: v.name,
                            model: v.model,
                            vehicle_class: v.vehicle_class,
                            manufacturer: v.manufacturer,
                            cost_in_credits: v.cost_in_credits ,
                            length: v.length,
                            crew: v.crew,
                            passengers: v.passengers,
                            max_atmosphering_speed: v.max_atmosphering_speed,
                            cargo_capacity: v.cargo_capacity,
                            consumables: v.consumables,
                            films: v.films,
                            pilots: v.pilots,
                            url: v.url                           
                        })
                    })
                )
                .toPromise()
        );
    }

    getVehiclePreNextPage(page: number): Promise<VehiclePage> {
        return (
            this.http.get<VehiclePage[]>(`https://swapi.co/api/vehicles/?page=${page}`)
                .pipe(
                    map(v => v),
                    map((v: any) => {
                        return (<VehiclePage>{ count: v.count, next: v.next, previous: v.previous })
                    })
                )
                .toPromise()
        )
    }

    getPlanetList(page: number): Promise<Planet[]> {
        return (
            this.http.get<Planet[]>(`https://swapi.co/api/planets/?page=${page}`)
                .pipe(
                    map(v => v['results']),
                    flatMap(v => v),
                    map((v: any) => {
                        return (<Planet>{ url: v.url, name: v.name });
                    }),
                    toArray()
                )
                .toPromise()
        )
    }

    getPlanetDetails(name: string): Promise<PlanetDetail> {
        return (
            this.http.get<PlanetDetail>(`https://swapi.co/api/planets/?search=${name}`)
                .pipe(
                    map(v => v['results'][0]),
                    map((v: any) => {
                        //var paras = v.url.split('/');
                        //paras = paras.reverse();
                        //var id = paras[5];
                        //var imageurl = '/assets/img/films/' + id + '.jpg';
                        return (<PlanetDetail>{
                            name: v.name,
                            diameter: v.diameter,
                            rotation_period: v.rotation_period,
                            orbital_period: v.orbital_period,
                            gravity: v.gravity ,
                            population: v.population,
                            climate: v.climate,
                            terrain: v.terrain,
                            surface_water: v.surface_water,
                            residents: v.residents,
                            films: v.films,
                            url: v.url                           
                        })
                    })
                )
                .toPromise()
        );
    } 

    getPlanetPreNextPage(page: number): Promise<PlanetPage> {
        return (
            this.http.get<PlanetPage[]>(`https://swapi.co/api/planets/?page=${page}`)
                .pipe(
                    map(v => v),
                    map((v: any) => {
                        return (<PlanetPage>{ count: v.count, next: v.next, previous: v.previous })
                    })
                )
                .toPromise()
        )
    }

}

