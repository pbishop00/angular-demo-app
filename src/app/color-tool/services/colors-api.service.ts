import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color, NewColor } from '../models/colors';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})


export class ColorsApiService {

  constructor(private httpClient: HttpClient) { }

  all(){
    console.log("Calling http Service get colors.");
    return this.httpClient.get<Color[]>(`${environment.apiUrl}/colors`);
  }

  append(color: NewColor){
    return this.httpClient.post<Color>(`${environment.apiUrl}/colors`, color);
  }

  remove(colorId: number){
    const url = `${environment.apiUrl}/colors/${encodeURIComponent(colorId)}`;
    return this.httpClient.delete<void>(url)
  }
}
