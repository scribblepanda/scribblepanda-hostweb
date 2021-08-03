import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  heading = "Our Services";
  quote = "People will forget what you said. They will forget what you did. But they will never forget how you made them feel.";
}
