import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

   inputOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSearch(event) {

    this.inputOpen = !this.inputOpen;
  }

  toggleInput(event) {

  }
}
