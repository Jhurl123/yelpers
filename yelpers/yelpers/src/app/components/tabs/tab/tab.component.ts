import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TabComponent implements OnInit {

  @Input() id: string;
  @Input() iconSrc: string;
  @Input() iconAlt: string;
  @Input() text: string;
  @Input() active: boolean;

  @Output() toggleTab = new EventEmitter<{id: string, active: boolean}>();

  absurl = window.location.href;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {

    this['iconSrcHTML'] = this.sanitizer.bypassSecurityTrustHtml(this.iconSrc);
  }

  activateTab() {

    if( this.active == false ) {

      this.toggleTab.emit({
        id: this.id,
        active: !this.active
      });
    }

  }



}
