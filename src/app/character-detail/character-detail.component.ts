import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BobsBurgersApiService } from '../bobs-burgers-api.service';
import { Character } from '../types';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  charDetail: Character | undefined;

  constructor(
    private api: BobsBurgersApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const name: string = this.activatedRoute.snapshot.paramMap.get('name') || '';
    this.api.getCharDetails(name)
    .then(charDetail => this.charDetail = charDetail)
    .catch(console.error);
  }

}
