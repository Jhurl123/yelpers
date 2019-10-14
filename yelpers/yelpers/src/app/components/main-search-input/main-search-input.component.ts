import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-search-input',
  templateUrl: './main-search-input.component.html',
  styleUrls: ['./main-search-input.component.scss']
})
export class MainSearchInputComponent implements OnInit {

  @Input() parentForm: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log(this.parentForm)
  }

}
