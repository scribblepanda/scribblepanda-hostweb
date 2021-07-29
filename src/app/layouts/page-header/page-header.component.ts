import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor() { }
 @Input() heading: string;
 @Input() quote: string;

  ngOnInit(): void {
  }

}
// Parallax effect
// Adapted from @ilonacodes article ->  https://link.medium.com/7fFiON6Q1X

// Update : added throttle to increase performance
window.addEventListener('scroll', throttle(parallax, 14));

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
};

function parallax() {
  var scrolled = window.pageYOffset;
  var parallax = document.getElementById("paralx") ;
  // You can adjust the 0.4 to change the speed
  var coords = (scrolled * 0.4) + 'px';
  if(parallax)
  parallax.style.transform = 'translateY(' + coords + ')';
};