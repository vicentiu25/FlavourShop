import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from "./backend/backend.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [BackendService]
})
export class CoreModule {
}
