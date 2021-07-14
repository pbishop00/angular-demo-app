import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

import { IColorToolStateModel } from '../../states/color-tool.state';
import { Color, NewColor } from '../../models/colors';
import { AppendColor, RemoveColor } from '../../actions/color-action';

@Component({
  selector: 'app-color-home',
  templateUrl: './color-home.component.html',
  styleUrls: ['./color-home.component.css']
})
export class ColorHomeComponent implements OnInit {

  colorForm!: FormGroup;

  //STEP: 2 - Selector
  @Select((state:{colorTool: IColorToolStateModel}) => {
    return state.colorTool.colors;
  })
  colors$!: Observable<Color[]>;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.colorForm = this.fb.group({
      name: '',
      hexcode:'',
    });
  }

  //STEP: 4 - Function
  doAddColor(){
    const newColor = this.colorForm.value as NewColor;
    //STEP: 5 - Dispatch the change 
    this.store.dispatch(new AppendColor(newColor) /*STEP 4: Create Action*/);
  }

  doDeleteColor(colorId: number){
    this.store.dispatch(new RemoveColor(colorId));
  }
}
