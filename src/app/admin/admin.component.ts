import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import("firebase/auth");
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
declare var $: any;

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
  element = "yo";
  deleteid = "";
  isLoading: boolean = false;
  nodata: boolean = false;
  editId: any;
  snackbar = false;
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
    this.isLoading = true;
    this.item$ = this.firestore
      .collection("post", (ref) => ref.where("author", "==", this.post.author))
      .valueChanges({ idField: "eventId" });
    this.item$.subscribe((data) => {
      this.isLoading = false;
      console.log(data);
      if (data.length == 0) this.nodata = true;
    });
    const el = document.getElementById("posts") as HTMLCanvasElement;

    this.scroller(el);
    this.snackbar = false;
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
  showModal(item) {
    $("#exampleModal").modal("show");
    this.deleteid = item;
  }
  edit(item) {
    this.firestore
      .collection("post")
      .doc(item)
      .valueChanges()
      .subscribe((data: any) => {
        this.post = data;
        this.editId = item;
        console.log(this.post);
      });
    const el = document.getElementById("postform") as HTMLCanvasElement;
    this.scroller(el);
  }
  delete(item) {
    this.firestore.collection("post").doc(item).delete();
    this.snackbar = true;
    setTimeout(() => {
      this.snackbar = false;
    }, 3000);
  }
  quote = "You are the hero! make some awesome content";

  postBlog(id) {
    this.firestore
      .collection("post")
      .doc(this.editId)
      .set(this.post)
      .then((res) => {
        this.success = true;
        this.editId = undefined;
        window.scrollTo(0, 0);
      });
  }
  scroller(el: HTMLElement) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  ngOnInit(): void {
    this.userDetails = this.auth.authState.subscribe((res) => {
      if (res) {
        if (res.email != "scribblepanda.in@gmail.com") {
          console.log(res);
          this.post.author = res.displayName;
          this.post.email = res.email;
          if (res.photoURL) this.post.authorPhoto = res.photoURL;
        }
      }
    });
  }
}
