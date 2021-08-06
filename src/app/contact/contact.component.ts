import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
  sendButton = "Send Query";
  heading = "Contact Us";
  quote = "Every good Coversations starts with good listening.";
  onSubmit(form: NgForm) {
    this.sendButton = "Sending...";
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
            webDesign: formValue.webDesign,
            webDevelopment: formValue.webdevelopment,
            digitalMarketing: formValue.digitalMarketing,
            mobileApp: formValue.mobileApp,
            otherService: formValue.others,

            uxSolutions: formValue.uxSolutions,
            budgetRange: formValue.budgetRange,
            deadline: formValue.deadline,
            textarea: formValue.textarea,
          },
          { headers: headers }
        )
        .subscribe((response) => {
          console.log(response);
          this.formsubmitted = true;
          this.scrollView();
          this.sendButton = "Send Query";
        });
      form.resetForm();
    }
  }
  @ViewChild("contactinfo") MyProp: ElementRef;
  scrollView() {
    this.MyProp.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  bringForm() {
    this.formsubmitted = false;
  }
}
