import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public searchKeywordEmitter: EventEmitter<string> = new EventEmitter<string>();
  
}
