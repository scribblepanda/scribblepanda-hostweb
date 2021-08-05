import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-aboutus",
  templateUrl: "./aboutus.component.html",
  styleUrls: ["./aboutus.component.scss"],
})
export class AboutusComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  heading = "About Us";
  quote =
    "Our Company is built on people - who work for us, and those we do business with.";
}
