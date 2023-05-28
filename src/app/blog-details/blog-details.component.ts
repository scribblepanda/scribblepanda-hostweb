import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Meta } from "@angular/platform-browser";
@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
  styleUrls: ["./blog-details.component.scss"],
})
export class BlogDetailsComponent implements OnInit {
  blogg: any;

  constructor(
    private firestore: AngularFirestore,
    private route: Router,
    private meta: Meta
  ) {
    var postid = this.route.url.split("/");
    console.log(postid[2]);
    firestore
      .collection("post")
      .doc(postid[2])
      .valueChanges()
      .subscribe((data: any) => {
        this.blogg = data;
        console.log(this.blogg);
        this.meta.addTag({ name: "og:title", content: this.blogg.title });
        this.meta.updateTag({
          name: "og:description",
          content: this.blogg.summary,
        });
        this.meta.addTag({
          name: "og:image",
          content: data?.cover,
        });
      });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
