import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Add, Subtract, Multiply, Divide } from '../../actions/calc-action';
import { DeleteHistoryEntry } from '../../actions/calc-history-action';
import { HistoryEntry } from '../../model/calc-history';
import { ICalculatorToolStateModel } from '../../states/calc-tool.state';
@Component({
  selector: 'app-calc-home',
  templateUrl: './calc-home.component.html',
  styleUrls: ['./calc-home.component.css']
})
export class CalcHomeComponent implements OnInit {

  calcForm!: FormGroup;

  @Select((state:{calcTool: ICalculatorToolStateModel}) =>{
    return state.calcTool.result;
  })
  result$!: Observable<number>;

  @Select((state:{calcTool: ICalculatorToolStateModel})=>
  {
    return state.calcTool.history;
  })
   history$!: Observable<HistoryEntry[]>;
  
  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.calcForm = this.fb.group({
      numInput: '',
    })
  }


  doAdd(){
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Add(input));
  }

  doSubtract(){
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Subtract(input));
  }

  doMultiply(){
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Multiply(input));
  }

  doDivide(){
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Divide(input));
  }

  delHistory(histId: number){
    this.store.dispatch(new DeleteHistoryEntry(histId));
  }
}
