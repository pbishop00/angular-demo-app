import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcHomeComponent } from './components/calc-home/calc-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { CalcToolState } from './states/calc-tool.state';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CalcHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([CalcToolState], {developmentMode: !environment.production})
  ],
  exports: [
    CalcHomeComponent,
  ]
})
export class CalcToolModule { }
