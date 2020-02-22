import { Directive, Input, Renderer2,  ElementRef } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Directive({
  selector: '[appGravatar]'
})
export class GravatarDirective {

  @Input('size') size: number;
  @Input('defaultSrc') defaultSrc: string;
  @Input() set email(value: string) {
      this.updateGravatar(value);
  }

  user: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnChanges() {


    if(this.user) this.updateGravatar(this.user.email)
  }

  updateGravatar(email) {

    if(this.defaultSrc) {

      this.renderer.setAttribute(this.el.nativeElement, 'src', this.defaultSrc);
    }
    else if(email) {
      const emailHash = Md5.hashStr(email.trim().toLowerCase());
      this.renderer.setAttribute(this.el.nativeElement, 'src', '//www.gravatar.com/avatar/' + emailHash+ '?s=' + this.size + 'd=404');
    }

  }

}
