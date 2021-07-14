import { HistoryEntry } from "../model/calc-history"

export class DeleteHistoryEntry{

    static readonly type = '[History] DeleteHistoryEntry'
    constructor(public historyId: number){}
}