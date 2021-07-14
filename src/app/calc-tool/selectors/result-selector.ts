import { ICalculatorToolStateModel } from "../states/calc-tool.state";

export const resultSelector = (state:{calcTool: ICalculatorToolStateModel}) =>{
    /*     let retVal = 0;
        state.calcTool.history.forEach(entry =>{
          if (entry.opType === "Add"){
            retVal += entry.opValue;
          }else if(entry.opType === "Subtract"){
            retVal -= entry.opValue;
          }else if(entry.opType === "Multiply"){
            retVal *= entry.opValue;
          }else if(entry.opType === "Divide"){
            retVal /= entry.opValue;
          }
        });
        return retVal; */
    
        //Using Reduce!
        return state.calcTool.history.reduce((result, entry) => {
          if (entry.opType === "Add"){
            return result + entry.opValue;
          }else if(entry.opType === "Subtract"){
            return result - entry.opValue;
          }else if(entry.opType === "Multiply"){
            return result * entry.opValue;
          }else if(entry.opType === "Divide"){
            return result / entry.opValue;
          }else{
            return 0;
          }
        }, 0);
      }