import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-body',
  templateUrl: './tabs-body.component.html',
  styleUrls: ['./tabs-body.component.scss']
})
export class TabsBodyComponent implements OnInit {

  @Input() id: string;
  @Input() active: boolean;
  @Input() content: {};



  constructor() { }

  ngOnInit() {
  }

}
