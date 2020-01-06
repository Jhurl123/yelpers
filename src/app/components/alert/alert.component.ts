import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input('alertType') alertType: string;
  @Input('alertText') alertText: string;
  constructor() { }

  ngOnInit() {
  }

}
