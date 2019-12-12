import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-row',
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.scss']
})
export class ContentRowComponent implements OnInit {

  @Input() headline: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
