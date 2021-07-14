import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { Color, NewColor } from "../models/colors";
import { AppendColor, RemoveColor } from "../actions/color-action";

export interface IColorToolStateModel {
    colors: Color[];
}

@State<IColorToolStateModel>({
    name: 'colorTool',
    // STEP: 1 - State
    defaults: {
        colors: [],
    },
})

@Injectable()
export class ColorToolState {

    //STEP: 6 - Run the reducer to apply the action to the current state, to create a new state
    @Action(AppendColor)//This decorator connects the action type to this reducer function.
    appendColor(ctx: StateContext<IColorToolStateModel>, action: AppendColor) {
        //This is the reducer function
        const colors = ctx.getState().colors;

        //creating a new state, replace the properties passed into patch state.
        ctx.patchState({
            colors: [
                ...colors,
                {
                    ...action.color,
                    id: Math.max(...colors.map(c => c.id), 0) + 1,
                },
            ],
        });
    }

    @Action(RemoveColor)
    removeColor(ctx: StateContext<IColorToolStateModel>, action: RemoveColor){
        const colors = ctx.getState().colors;
        ctx.patchState({
            colors: 
                colors.filter(c => c.id !== action.colorId),
            
        });
    }

}