import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  error: any;
  content = "";

  constructor(public auth: AngularFireAuth) {}
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
  quote = "You are the hero! make some awesome content";
  ngOnInit(): void {}
}
