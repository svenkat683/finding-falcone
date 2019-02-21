import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PlanetIntf } from "../../models/planet";
import { VehicleIntf } from "../../models/vehicle";
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

  getPlanets(): Observable<PlanetIntf[]> {
    return this.http.get<PlanetIntf[]>(this.apiBaseUrl + "planets");
  }

  getVehicles(): Observable<VehicleIntf[]> {
    return this.http.get<VehicleIntf[]>(this.apiBaseUrl + "vehicles");
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
      this.apiBaseUrl + "find",
      falconeFindRequest,
      httpOptions
    );
  }
}
