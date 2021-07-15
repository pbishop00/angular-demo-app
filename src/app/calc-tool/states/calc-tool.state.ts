import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { switchMap, tap } from "rxjs/operators";
import { Add, Divide, Multiply, Subtract } from "../actions/calc-action";
import { ClearHistory, DeleteHistoryEntry, RefreshHistory } from "../actions/calc-history-action";
import { HistoryEntry } from "../model/calc-history";
import { CalcHistoryApiService } from "../services/calc-history-service.service";
import { SetErrorMessage, ClearErrorMessage } from "../actions/status-actions";
export interface ICalculatorToolStateModel {
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
export class CalcToolState {

    constructor(private historyApi: CalcHistoryApiService) { }

    @Action(RefreshHistory)
    refreshColors(ctx: StateContext<ICalculatorToolStateModel>) {
        console.log('In Refresh History');
        return this.historyApi.all().pipe(tap(history => ctx.patchState({ history })));


    }

    @Action(Add)
    addInput(ctx: StateContext<ICalculatorToolStateModel>, action: Add) {
        // return this.historyApi.append({
        //                 opType: 'Add',
        //                 opValue: action.input,
        //              })
        //              .pipe(
        //                 tap(() => ctx.dispatch(new RefreshHistory()))
        //              );


        // return this.historyApi.append({opType: 'Add', opValue: action.input})
        //              .pipe(
        //                 switchMap((r: HistoryEntry) => {
        //                     console.log(r);
        //                     return ctx.dispatch(new RefreshHistory());
        //                 })
        //              );


        // const {history} = ctx.getState();
        // ctx.patchState({
        //     errorMessage: '',
        //     history:[
        //         ...history,
        //         {
        //             id: Math.max(...history.map(h => h.id),0) + 1,
        //             opType: 'Add',
        //             opValue: action.input,

        //         }
        //     ]
        // });

        //Clear message and patch state directly
        // return ctx.dispatch(new ClearErrorMessage()).pipe(tap(() => {
        //     const { history } = ctx.getState();
        //     ctx.patchState({
        //       // errorMessage: '',
        //       history: [
        //         ...history,
        //         {
        //           id: Math.max(...history.map(h => h.id), 0) + 1,
        //           opName: 'Add',
        //           opValue: action.input,
        //         }
        //       ]
        //     });
        //   }))

        //Clear message, do append/refresh in the same pipeline
        return ctx.dispatch(new ClearErrorMessage()).pipe(switchMap(() => {
            return this.historyApi.append({ opType: 'Add', opValue: action.input })
                .pipe(
                    switchMap((r: HistoryEntry) => {
                        console.log(r);
                        return ctx.dispatch(new RefreshHistory());
                    })
                );
        }));
    }
    @Action(Subtract)
    subtractInput(ctx: StateContext<ICalculatorToolStateModel>, action: Subtract) {

        return ctx.dispatch(new ClearErrorMessage()).pipe(switchMap(() => {
            return this.historyApi.append({ opType: 'Subtract', opValue: action.input })
                .pipe(
                    switchMap((r: HistoryEntry) => {
                        console.log(r);
                        return ctx.dispatch(new RefreshHistory());
                    })
                );
        }));
        // const {history} = ctx.getState();
        // ctx.patchState({
        //     errorMessage: '',
        //     history:[
        //         ...history,
        //         {
        //             id: Math.max(...history.map(h => h.id),0) + 1,
        //             opType: 'Subtract',
        //             opValue: action.input,

        //         }
        //     ]
        // });
    }
    @Action(Multiply)
    multiplyInput(ctx: StateContext<ICalculatorToolStateModel>, action: Multiply) {
        return ctx.dispatch(new ClearErrorMessage()).pipe(switchMap(() => {
            return this.historyApi.append({ opType: 'Multiply', opValue: action.input })
                .pipe(
                    switchMap((r: HistoryEntry) => {
                        console.log(r);
                        return ctx.dispatch(new RefreshHistory());
                    })
                );
        }));
        // const {history} = ctx.getState();
        // ctx.patchState({
        //     errorMessage: '',
        //     history:[
        //         ...history,
        //         {
        //             id: Math.max(...history.map(h => h.id),0) + 1,
        //             opType: 'Multiply',
        //             opValue: action.input,

        //         }
        //     ]
        // });
    }
    @Action(Divide)
    divideInput(ctx: StateContext<ICalculatorToolStateModel>, action: Divide) {
        if (action.input === 0) {
            return ctx.dispatch(new SetErrorMessage("Cannot divide by 0"));
        } else {
            return ctx.dispatch(new ClearErrorMessage()).pipe(switchMap(() => {
                return this.historyApi.append({ opType: 'Divide', opValue: action.input })
                    .pipe(
                        switchMap((r: HistoryEntry) => {
                            console.log(r);
                            return ctx.dispatch(new RefreshHistory());
                        })
                    );
            }));
        }

        // if (action.input === 0){
        //     ctx.patchState({errorMessage: 'Cannot divide by 0'});
        // }else{
        //     const {history} = ctx.getState();
        //     ctx.patchState({
        //         errorMessage: '',
        //         history:[
        //             ...history,
        //             {
        //                 id: Math.max(...history.map(h => h.id),0) + 1,
        //                 opType: 'Divide',
        //                 opValue: action.input,

        //             }
        //         ]

        //     });
        // }
    }

    @Action(DeleteHistoryEntry)
    deleteHistoryEntry(ctx: StateContext<ICalculatorToolStateModel>, action: DeleteHistoryEntry) {
        return ctx.dispatch(new ClearErrorMessage()).pipe(switchMap(() => {
            return this.historyApi.remove(action.historyId)
                .pipe(
                    tap(() => ctx.dispatch(new RefreshHistory()))
                );
        }));
        // const {history} = ctx.getState();
        // ctx.patchState({
        //     history: history.filter(h => h.id !== action.historyId),
        // });
    }

    @Action(ClearHistory)
    clearHistory(ctx: StateContext<ICalculatorToolStateModel>) {
        // return ctx.dispatch(new ClearErrorMessage()).pipe(switchMap(() => {
        //     return this.historyApi.clear()
        //         .pipe(
        //             tap(() => ctx.dispatch(new RefreshHistory()))
        //         );
        // }));

        //Code starts looking like data!
        const funcs: [any, any] = [
            switchMap(() => this.historyApi.clear()),
            switchMap(() => ctx.dispatch(new RefreshHistory())),
        ];
        return ctx.dispatch(new ClearErrorMessage())
            .pipe(
               ...funcs
            );
    }
    @Action(SetErrorMessage)
    setErrorMessage(ctx: StateContext<ICalculatorToolStateModel>, action: SetErrorMessage) {
        ctx.patchState({
            errorMessage: action.message,
        })
    }

    @Action(ClearErrorMessage)
    clearErrorMessage(ctx: StateContext<ICalculatorToolStateModel>) {
        ctx.patchState({
            errorMessage: '',
        })
    }
}