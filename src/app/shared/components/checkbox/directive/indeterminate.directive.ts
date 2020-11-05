import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[indeterminate]'
})
export class IndeterminateDirective implements OnInit {

  constructor(private el: ElementRef) {

    console.log(this.el.nativeElement);
   }

  ngOnInit(): void {
    console.log(this.el.nativeElement);
    
    this.el.nativeElement.indeterminate = true;
  }
}
