import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
require("firebase/auth");
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
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
  //profile: any;

  constructor(
    public auth: AngularFireAuth,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}
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
  authorDetails() {
    const user = firebase.auth().currentUser;

    if (user !== null) {
      user.providerData.forEach((current) => {
        console.log("Sign-in provider: " + current.providerId);
        console.log("  Provider-specific UID: " + current.uid);
        console.log("  Name: " + current.displayName);
        console.log("  Email: " + current.email);
        console.log("  Photo URL: " + current.photoURL);
        this.post.author = current.displayName;
        this.post.authorPhoto = current.photoURL;
      });
    }
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
  quote = "You are the hero! make some awesome content";
  post: Object = {
    content: "",
    author: "Scribble Panda",
    date: new Date().toDateString(),
    authorPhoto: "../../assets/images/panda-user.jpg",
  };

  postBlog() {
    this.firestore
      .collection("post")
      .add(this.post)
      .then((res) => {
        this.success = true;
        window.scrollTo(0, 0);
      });
  }
  ngOnInit(): void {}
}
