import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
  styleUrls: ["./blog-details.component.scss"],
})
export class BlogDetailsComponent implements OnInit {
  item$: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.item$ = firestore.collection("post").valueChanges();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
window.addEventListener("scroll", throttle(parallax, 14));

function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function parallax() {
  var scrolled = window.pageYOffset;
  var parallax = document.getElementById("paralx");
  // You can adjust the 0.4 to change the speed
  var coords = scrolled * 0.4 + "px";
  if (parallax) parallax.style.transform = "translateY(" + coords + ")";
}
