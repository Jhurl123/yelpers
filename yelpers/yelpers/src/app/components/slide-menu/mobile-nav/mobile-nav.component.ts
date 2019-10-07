import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  @Output() closeMenu = new EventEmitter<{toggle: boolean}>();
  constructor() { }

  ngOnInit() {
  }

  closeMenuClick() {
    this.closeMenu.emit();
  }

}
