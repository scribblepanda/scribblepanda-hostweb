import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ClientsComponent } from "./clients/clients.component";
import { ServicesComponent } from "./services/services.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { BlogComponent } from "./blog/blog.component";
import { ContactComponent } from "./contact/contact.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { PageHeaderComponent } from "./layouts/page-header/page-header.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    ServicesComponent,
    AboutusComponent,
    BlogComponent,
    ContactComponent,
    BlogDetailsComponent,
    PageHeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "clients", component: ClientsComponent },
      { path: "services", component: ServicesComponent },
      { path: "about", component: AboutusComponent },
      { path: "blogs", component: BlogComponent },
      { path: "blog-details", component: BlogDetailsComponent },
      { path: "contact", component: ContactComponent },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", component: HomeComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
