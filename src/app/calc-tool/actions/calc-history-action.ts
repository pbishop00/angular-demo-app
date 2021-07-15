import { HistoryEntry } from "../model/calc-history"

export class DeleteHistoryEntry{

    static readonly type = '[History] DeleteHistoryEntry'
    constructor(public historyId: number){}
}

export class ClearHistory{
    static readonly type = '[History] Clear'
    constructor(){}
}

export class RefreshHistory{
    static readonly type = '[History] Refresh'
    constructor(){};
}