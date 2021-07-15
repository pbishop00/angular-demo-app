import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HistoryEntry, NewHistoryEntry } from "../model/calc-history";
import { environment } from "src/environments/environment";
import { forkJoin } from "rxjs";
import { switchMap } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
  })
  
  
  export class CalcHistoryApiService {
  
    constructor(private httpClient: HttpClient) { }
  
    all(){
      console.log("Calling http Service get calc history.");
      return this.httpClient.get<HistoryEntry[]>(`${environment.apiUrl}/history`);
    }
  
    append(entry: NewHistoryEntry){
      return this.httpClient.post<HistoryEntry>(`${environment.apiUrl}/history`, entry);
    }
  
    remove(entryId: number){
      const url = `${environment.apiUrl}/history/${encodeURIComponent(entryId)}`;
      return this.httpClient.delete<void>(url)
    }

    clear(){
      console.log("Clearing the calc history");
      
      return this.httpClient.get<HistoryEntry[]>(`${environment.apiUrl}/history`)
          .pipe(switchMap(history => forkJoin(history.map(entry => this.remove(entry.id)))))
      
      
      
    }
  }
