import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Planet } from "../../models/planet";
import { Vehicle } from "../../models/vehicle";
import { FindFalconeRequest } from "../../models/findingFolconeRequest";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map, find } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FindingFalconeService {
  apiBaseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.apiBaseUrl + "planets");
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiBaseUrl + "vehicles");
  }

  getToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json"
      })
    };
    return this.http.post(this.apiBaseUrl + "token", "", httpOptions);
  }

  findngFalcone(falconeFindRequest: FindFalconeRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-type": "application/json"
      })
    };
    return this.http.post(
      this.apiBaseUrl + find,
      falconeFindRequest,
      httpOptions
    );
  }
}
