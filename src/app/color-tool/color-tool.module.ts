import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ColorHomeComponent } from './components/color-home/color-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorToolState } from './states/color-tool.state';
import { environment } from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    ColorHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([ColorToolState], {developmentMode: !environment.production}),
  ],
  exports: [ColorHomeComponent]
})
export class ColorToolModule { }
