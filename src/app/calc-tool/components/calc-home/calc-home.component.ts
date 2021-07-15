import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Add, Subtract, Multiply, Divide } from '../../actions/calc-action';
import { ClearHistory, DeleteHistoryEntry } from '../../actions/calc-history-action';
import { HistoryEntry } from '../../model/calc-history';
import { ICalculatorToolStateModel } from '../../states/calc-tool.state';
import { OpCounts } from '../../model/calc-operation-counts';
import { resultSelector } from '../../selectors/result-selector';
import { operationCount } from '../../selectors/op-count-selector';
@Component({
  selector: 'app-calc-home',
  templateUrl: './calc-home.component.html',
  styleUrls: ['./calc-home.component.css']
})
export class CalcHomeComponent implements OnInit {

  calcForm!: FormGroup;

  @Select(resultSelector)
  result$!: Observable<number>;

  @Select((state: { calcTool: ICalculatorToolStateModel }) => {
    return state.calcTool.history;
  })
  history$!: Observable<HistoryEntry[]>;

  @Select(operationCount)
  counts$!: Observable<OpCounts[]>;

  @Select((state: { calcTool: ICalculatorToolStateModel }) => {
     return state.calcTool.errorMessage;
  })
  errMessage$!: Observable<string>;

  constructor(private store: Store, private fb: FormBuilder) { }



  ngOnInit(): void {
    this.calcForm = this.fb.group({
      numInput: '0',
    })
  }


  doAdd() {
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Add(input));
  }

  doSubtract() {
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Subtract(input));
  }

  doMultiply() {
    const input = parseFloat(this.calcForm.get('numInput')?.value);
    this.store.dispatch(new Multiply(input));
  }

  doDivide() {
    const input = parseFloat(this.calcForm.get('numInput')?.value);
      this.store.dispatch(new Divide(input));
  }

  delHistory(histId: number) {
    this.store.dispatch(new DeleteHistoryEntry(histId));
  }

  doReset() {
    this.calcForm.get('numInput')?.setValue(0);
    this.store.dispatch(new ClearHistory());
  }

}
