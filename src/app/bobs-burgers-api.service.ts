import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Character } from './types';

@Injectable({
  providedIn: 'root'
})
export class BobsBurgersApiService {

  private apiPrefix: string = environment.API_BASE;

  constructor() { }

  private searchCharactersCache: Record<string, Character[]> = {};
  private listCharacters: Character[] = [];
  private getCharacterDetailsCache: Record<string, Character> = {};

  async listChars(): Promise<Character[]> {
    if (this.listCharacters.length > 0) return this.listCharacters;

    const response = await fetch(`${this.apiPrefix}/characters`)
    const data: Character[] = await response.json();
    this.listCharacters = data;
    return data;
  }

  async searchChars(keyword: string): Promise<Character[]> {
    if (keyword in this.searchCharactersCache) return this.searchCharactersCache[keyword];

    const response = await fetch(`${this.apiPrefix}/characters?name=${keyword}`)
    const data: {items: Character[]} = await response.json();
    this.searchCharactersCache[keyword] = data.items
    return data.items;
  }

  async getCharDetails(name: string): Promise<Character> {
    if (name in this.getCharacterDetailsCache) return this.getCharacterDetailsCache[name];
    
    const response = await fetch(`${this.apiPrefix}/characters/${name}`)
    const data: Character = await response.json();
    this.getCharacterDetailsCache[name] = data
    return data;
  }
}
