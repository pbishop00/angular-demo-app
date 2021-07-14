export type HistoryEntry = {
    id: number;
    opType: string;
    opValue: number;
}

export type NewHistoryEntry = Omit<HistoryEntry, "id">;