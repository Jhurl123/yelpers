import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss']
})
export class CategoriesSelectComponent implements OnInit {

  @Input() parentForm: FormGroup;

  categories = [

    {
      id: 1,
      category: 'Hotels'
    },
    {
      id: 2,
      category: 'Restaurants'
    },
    {
      id: 3,
      category: 'Things To Do'
    },
    {
      id: 4,
      category: 'Home Services'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
