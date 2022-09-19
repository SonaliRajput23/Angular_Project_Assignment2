import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../types';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent{

  @Input() character!: Character;

  constructor() { }

}
