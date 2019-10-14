import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss']
})
export class LocationSelectComponent implements OnInit {

  @Input() parentForm: FormGroup;

  location: any;

  constructor() { }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  success(pos) {
    console.log(pos);
  }

  error(error) {
    console.log(error);
  }
}
