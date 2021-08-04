import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
heading = "Contact Us"
quote ="Every good Coversations starts with good listening."
onSubmit(form: NgForm) {
  console.log('Your form data : ', form.value);
  if (form.valid) {
    const formValue = form.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/xknkqpnj',
      { 
      budgetRange: formValue.budgetRange,
      email: formValue.email,
      name: formValue.name,
      service: formValue.service,
      textarea: formValue.textarea 
    },
      { 'headers': headers }).subscribe(
        response => {
          console.log(response);
          alert("Your Enquiry submitted successfully");
        }
      );
  }
}
}