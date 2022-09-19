import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BobsBurgersApiService } from '../bobs-burgers-api.service';
import { CommonService } from '../common.service';
import { Character } from '../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {

  characters : Character[] = [];
  searchKeywordEmitterSubscription!: Subscription;

  constructor(
    private api: BobsBurgersApiService,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.getChars(queryParams['keyword'] || '');

    this.searchKeywordEmitterSubscription = this.commonService.searchKeywordEmitter.subscribe((keyword: string) => {
      this.updateQueryParam({keyword})
      this.getChars(keyword);
    });
  }

  getChars(keyword: string): void {
    let charsPromise: Promise<Character[]>;
    if (keyword) {
      charsPromise = this.api.searchChars(keyword);
    } else {
      charsPromise = this.api.listChars();
    }

    charsPromise
      .then(characters => this.characters = characters)
      .catch(console.error);
  }

  updateQueryParam(queryParams: Record<string, string>) {
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // Remove to replace all query params by provided
      }
    );
  }

  ngOnDestroy(): void {
    this.searchKeywordEmitterSubscription.unsubscribe();
  }

}
