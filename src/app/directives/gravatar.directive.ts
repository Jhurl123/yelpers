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

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges() {

    let src = this.el.nativeElement.getAttribute('src');

    if(src) {
      if(src.includes('a0a6ef17bcf1e809d8ece5be8dfdbc31')
          || src.includes('d42a11c874a6884f43eddbe1479d1af5')) {

        this.renderer.setAttribute(this.el.nativeElement, 'src', '../../assets/images/user-placeholder.png');
      }
    }
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
