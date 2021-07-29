import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  items = ["", "", "", "", ""];
  constructor() {}
  quote = "Blogging is a conversation, not a code.";
  heading = "Blog";
  ngOnInit(): void {}
}
