import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  item$: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.item$ = firestore
      .collection("post")
      .valueChanges({ idField: "eventId" });
  }
  quote = "Blogging is a conversation, not a code.";
  heading = "Blog";
  ngOnInit(): void {}
}
