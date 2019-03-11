import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Character } from './character';
import { CHARACTERS } from './mock-characters';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): Observable<Character[]> {
    return of(CHARACTERS);
  }

  getCharacter(id: number): Observable<Character> {
    // TODO: send the message _after_ fetching the hero
    return of(CHARACTERS.find(character => character.id === id));
  }
}
