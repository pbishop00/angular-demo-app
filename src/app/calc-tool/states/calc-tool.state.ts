import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Add, Multiply, Subtract, Divide } from "../actions/calc-action";
import { DeleteHistoryEntry } from "../actions/calc-history-action";
import { HistoryEntry } from "../model/calc-history";



export interface ICalculatorToolStateModel{
    result: number;
    history: HistoryEntry[];
}





@State<ICalculatorToolStateModel>({
    name: 'calcTool',
    defaults: {
        result: 0,
        history: [],
    },
})
@Injectable()
export class CalcToolState{
    @Action(Add)
    addInput(ctx: StateContext<ICalculatorToolStateModel>, action: Add){
        const {result, history} = ctx.getState();
        ctx.patchState({
            result: result + action.input,
            history:[
                ...history,
                {
                    id: Math.max(...history.map(h => h.id),0) + 1,
                    opType: 'Add',
                    opValue: action.input,

                }
            ]
        });
    }
    @Action(Subtract)
    subtractInput(ctx: StateContext<ICalculatorToolStateModel>, action: Subtract){
        const {result, history} = ctx.getState();
        ctx.patchState({
            result: result - action.input,
            history:[
                ...history,
                {
                    id: Math.max(...history.map(h => h.id),0) + 1,
                    opType: 'Subtract',
                    opValue: action.input,

                }
            ]
        });
    }
    @Action(Multiply)
    multiplyInput(ctx: StateContext<ICalculatorToolStateModel>, action: Multiply){
        const {result, history} = ctx.getState();
        ctx.patchState({
            result: result * action.input,
            history:[
                ...history,
                {
                    id: Math.max(...history.map(h => h.id),0) + 1,
                    opType: 'Multiply',
                    opValue: action.input,

                }
            ]
        });
    }
    @Action(Divide)
    divideInput(ctx: StateContext<ICalculatorToolStateModel>, action: Divide){
        const {result, history} = ctx.getState();
        ctx.patchState({
            result: result / action.input,
            history:[
                ...history,
                {
                    id: Math.max(...history.map(h => h.id),0) + 1,
                    opType: 'Divide',
                    opValue: action.input,

                }
            ]
        });
    }

    @Action(DeleteHistoryEntry)
    deleteHistoryEntry(ctx: StateContext<ICalculatorToolStateModel>, action: DeleteHistoryEntry){
        const {result, history} = ctx.getState();
        ctx.patchState({
            result: result,
            history: history.filter(h => h.id !== action.historyId),
        });
    }
   
}