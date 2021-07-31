import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { fader, fadeAnimation } from "./route-animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = "scribble";
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
}
