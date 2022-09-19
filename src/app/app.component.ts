import { Component, OnInit } from '@angular/core';
import { Character } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  bobCharacter: Character[] = [];
  title = "Bob's - Burger";

  ngOnInit(): void {
    fetch('https://bobsburgers-api.herokuapp.com/characters')
  .then((response) => response.json())
  .then((data) => this.bobCharacter = data);

  }
}
