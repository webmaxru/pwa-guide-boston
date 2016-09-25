import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Attraction } from './attraction';

@Injectable()
export class AttractionService {

  private attractionsUrl = './assets/data/attractions.json';

  constructor(private http: Http) { }

  getAttractions(): Observable<Attraction[]> {
    return this.http.get(this.attractionsUrl)
      .map(res => res.json() || {});
  }

}
