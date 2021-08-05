import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  formsubmitted: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.formsubmitted = false;
  }
  heading = "Contact Us";
  quote = "Every good Coversations starts with good listening.";
  onSubmit(form: NgForm) {
    console.log("Your form data : ", form.value);
    if (form.valid) {
      const formValue = form.value;
      const headers = new HttpHeaders({ "Content-Type": "application/json" });
      this.http
        .post(
          "https://api.web3forms.com/submit",
          {
            apikey: "187fdadd-b76f-487d-a603-e5815ac88248",
            name: formValue.name,
            email: formValue.email,
            phone: formValue.phone,
            service: formValue.service,
            budgetRange: formValue.budgetRange,
            textarea: formValue.textarea,
          },
          { headers: headers }
        )
        .subscribe((response) => {
          console.log(response);
          this.formsubmitted = true;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        });
      form.resetForm();
    }
  }

  bringForm() {
    this.formsubmitted = false;
  }
}
