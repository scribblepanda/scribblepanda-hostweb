import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import("firebase/auth");
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  error: any;
  content = "";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  success = false;
  userDetails: any;
  setpost() {
    this.post = {
      title: "",
      summary: "",
      cover: "",
      content: "",
      date: new Date().toDateString(),
      timestamp: Date.now(),
    };
  }
  post: any = {
    author: "Scribble Panda",
    authorPhoto: "../../assets/images/panda-user.jpg",
  };
  //profile: any;

  constructor(
    public auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {
    this.setpost();
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = Date.now().toString();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    console.log(this.uploadPercent);
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe();
  }
  item$: Observable<any[]>;
  fetchblog() {
    this.item$ = this.firestore
      .collection("post", (ref) => ref.where("author", "==", this.post.author))
      .valueChanges({ idField: "eventId" });
  }
  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result: any) => {
        // const profile = result.user;
        //console.log(this.profile.displayName);
      });
  }
  logout() {
    this.auth.signOut();
  }
  edit(item) {
    this.firestore
      .collection("post")
      .doc(item)
      .valueChanges()
      .subscribe((data: any) => {
        this.post = data;
        console.log(this.post);
      });
  }
  delete(item) {
    this.firestore.collection("post").doc(item).delete();
  }
  quote = "You are the hero! make some awesome content";

  postBlog() {
    this.firestore
      .collection("post")
      .doc(undefined)
      .set(this.post)
      .then((res) => {
        this.success = true;
        window.scrollTo(0, 0);
      });
  }
  ngOnInit(): void {
    this.userDetails = this.auth.authState.subscribe((res) => {
      if (res) {
        if (res.displayName != "Scribble Panda") {
          console.log(res);
          this.post.author = res.displayName;
          if (res.photoURL) this.post.authorPhoto = res.photoURL;
        }
      }
    });
  }
}
