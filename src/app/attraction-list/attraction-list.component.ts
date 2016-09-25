import { Component, OnInit } from '@angular/core';

import { Attraction }              from '../attraction';
import { AttractionService }       from '../attraction.service';

@Component({
  selector: 'app-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.css']
})
export class AttractionListComponent implements OnInit {

  errorMessage: string;
  attractions: Attraction[];

  constructor(private attractionService: AttractionService) { }

  ngOnInit() {
    this.getAttractions();
  }

  getAttractions() {
    this.attractionService.getAttractions()
      .subscribe(
      attractions => this.attractions = attractions,
      error => this.errorMessage = <any>error);
  }

}
