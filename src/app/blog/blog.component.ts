import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { timeout } from "rxjs/operators";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
})
export class BlogComponent implements OnInit {
  isLoading = true;
  item$: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    console.log(this.item$);
    this.item$ = firestore
      .collection("post", (ref) => ref.orderBy("timestamp", "desc"))
      .valueChanges({ idField: "eventId" });
    this.item$.subscribe(() => (this.isLoading = false));
    console.log(this.item$);
  }
  quote = "Blogging is a conversation, not a code.";
  heading = "Blog";
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
