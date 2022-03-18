import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './Lian-Li/app.component';
import { SL_DevicePageComponent } from './Lian-Li/SL_DeviceFolder/SL_DevicePage';
import { AL_DevicePageComponent } from './Lian-Li/AL_DeviceFolder/AL_DevicePage';
@NgModule({
  declarations: [
    AppComponent,
    SL_DevicePageComponent,
    AL_DevicePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
