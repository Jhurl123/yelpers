import { Component, OnInit } from '@angular/core';
import *  as svgLoader from '../../../assets/images/svg-store.json';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  svgObject = svgLoader;

  tabs = [
    {
      id: 1,
      iconSrc: this.svgObject.default['utensils'],
      iconAlt: "Utensils Icon",
      text: "Stuff Your Face",
      content: {
        imageSrc: '../../../assets/images/restaurant-home-two-column.jpg',
        headerText: "Take a Memorable Bite",
        bodyText: 'Sign up and save your favorite restaurant. Find a place to chow down. \n \nWhen you search with us, we recommend only the best restaurants near you or the area you want to be in',
        linkText: 'Visit Restaurants',
        linkRoute: '/restaurants'
      },
      active: true
    },
    {
      id: 2,
      iconSrc: this.svgObject.default['wrench'],
      iconAlt: "Wrench Icon",
      text: "Fix Your Home",
      content: {
        imageSrc: '../../../assets/images/repair-home-two-column.jpg',
        headerText: 'Find the Best Quote',
        bodyText: 'Lorem ipsum dolor sit amet, Donec eget bibendum felis. Mauris vulputate pellentesque libero, \n eget porttitor eros egestas eu. Pinterdum ut. Vivamus tortor est, luctus et ante quis, consectetur bibendum mi. Morbi viverra odio vitae sem accumsan, quis aliquam mi finibus. Sed hendrerit luctus felis, a lacinia lorem mattis at',
        linkText: 'Visit Home Repair',
        linkRoute: '/home-services'
      },
      active: false
    },
    {
      id: 3,
      iconSrc: this.svgObject.default['bed'],
      iconAlt: "Bed Icon",
      text: "Rest Your Body",
      content: {
        imageSrc: '../../../assets/images/hotel-home-two-column.jpg',
        headerText: 'Stay in the Place of your Dreams',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia gravida metus, ac malesuada purus interdum ut. Vivamus tortor est, luctus et ante quis, consectetur bibendum mi. Morbi viverra odio vitae sem accumsan, quis aliquam mi finibus.',
        linkText: 'Visit Hotels',
        linkRoute: '/hotels'
      },
      active: false
    }

  ];



  constructor() { }

  ngOnInit() {

  }

  activateTab(event) {

    const id = event.id;
    const active = event.active;

    this.tabs = this.tabs.map(tab => {

        if(tab.id == event.id ) {
          tab.active = !tab.active;

        }
        else {
          tab.active = false
        }
        return tab;
    });
  }

}
