import { ICalculatorToolStateModel } from "../states/calc-tool.state";


export const operationCount = (state: { calcTool: ICalculatorToolStateModel }) => {
    let addCount = 0;
    let subCount = 0;
    let mulCount = 0;
    let divCount = 0;
    state.calcTool.history.forEach(entry => {
      if (entry.opType === "Add") {
        ++addCount;
      } else if (entry.opType === "Subtract") {
        ++subCount;
      } else if (entry.opType === "Multiply") {
        ++mulCount;
      } else if (entry.opType === "Divide") {
        ++divCount;
      }
    });
    return [
      {
        opType: "Add",
        opCount: addCount,
      },
      {
        opType: "Subtract",
        opCount: subCount,
      },
      {
        opType: "Multiply",
        opCount: mulCount,
      },
      {
        opType: "Divide",
        opCount: divCount,
      },
    ];
  }