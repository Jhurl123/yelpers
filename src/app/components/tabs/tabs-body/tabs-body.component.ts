import { Component, OnInit, Input } from '@angular/core';
import { tabContent } from '@/models/tabs.model';

@Component({
  selector: 'app-tabs-body',
  templateUrl: './tabs-body.component.html',
  styleUrls: ['./tabs-body.component.scss']
})
export class TabsBodyComponent implements OnInit {

  @Input() id: number;
  @Input() active: boolean;
  @Input() content: tabContent;



  constructor() { }

  ngOnInit() {
  }

}
