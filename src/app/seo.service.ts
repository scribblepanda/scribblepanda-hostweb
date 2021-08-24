import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class SeoService {
  constructor(private meta: Meta, private titleService: Title) {}

  generateTags(tags) {
    tags = {
      title: "ScribblePanda Pvt Ltd",
      description:
        " ScribblePanda is a Web service for creating websites, and Marketing your Products.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/scribblepanda-ce168.appspot.com/o/panda-user.jpg?alt=media&token=bad662c8-dc0d-4d85-a51f-ff4b9769967b",
      slug: "",
      ...tags,
    };

    this.titleService.setTitle(tags.title);
    this.meta.updateTag({ name: "twitter:card", content: "summary" });
  }
}
