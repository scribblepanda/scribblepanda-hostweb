import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  error: any;
  content = "";
  downloadURL: Observable<string>;

  constructor(
    public auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {}
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = Date().toString();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
      .subscribe();
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
  quote = "You are the hero! make some awesome content";
  ngOnInit(): void {}
}
