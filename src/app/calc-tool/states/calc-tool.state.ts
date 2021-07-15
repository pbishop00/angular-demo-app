import { CONTEXT_NAME } from "@angular/compiler/src/render3/view/util";
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { Add, Multiply, Subtract, Divide } from "../actions/calc-action";
import { ClearHistory, DeleteHistoryEntry, RefreshHistory } from "../actions/calc-history-action";
import { HistoryEntry } from "../model/calc-history";
import { CalcHistoryApiService } from "../services/calc-history-service.service";
import { tap } from "rxjs/operators";


export interface ICalculatorToolStateModel{
    history: HistoryEntry[];
    errorMessage: string;
}





@State<ICalculatorToolStateModel>({
    name: 'calcTool',
    defaults: {
        history: [],
        errorMessage: '',
    },
})
@Injectable()
export class CalcToolState{

    constructor(private historyApi: CalcHistoryApiService) {}

    @Action(RefreshHistory)
    refreshColors(ctx: StateContext<ICalculatorToolStateModel>) {
        console.log('In Refresh History');
        return this.historyApi.all().pipe(tap(history => ctx.patchState({ history })));


    }

    @Action(Add)
    addInput(ctx: StateContext<ICalculatorToolStateModel>, action: Add){
        const {history} = ctx.getState();
        ctx.patchState({
            errorMessage: '',
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
        const {history} = ctx.getState();
        ctx.patchState({
            errorMessage: '',
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
        const {history} = ctx.getState();
        ctx.patchState({
            errorMessage: '',
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
        if (action.input === 0){
            ctx.patchState({errorMessage: 'Cannot divide by 0'});
        }else{
            const {history} = ctx.getState();
            ctx.patchState({
                errorMessage: '',
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
    }

    @Action(DeleteHistoryEntry)
    deleteHistoryEntry(ctx: StateContext<ICalculatorToolStateModel>, action: DeleteHistoryEntry){
        const {history} = ctx.getState();
        ctx.patchState({
            history: history.filter(h => h.id !== action.historyId),
        });
    }

    @Action(ClearHistory)
    clearHistory(ctx: StateContext<ICalculatorToolStateModel>){
        ctx.patchState({
            errorMessage: '',
            history: []
        });
    }
   
}