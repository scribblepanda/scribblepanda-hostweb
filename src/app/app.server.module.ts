import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";

import { AppModule } from "./app.module";
import { AppComponent } from "./app.component";
import { TransferState, makeStateKey } from "@angular/platform-browser";
const MY_DATA_KEY = makeStateKey<string>("myData");

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(private transferState: TransferState) {
    this.transferState.set(MY_DATA_KEY, "Some data");

    // On the client-side, retrieve the data from TransferState
    const myData = this.transferState.get(MY_DATA_KEY, "");
  }
}
