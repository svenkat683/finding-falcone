import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { PlanetIntf } from "../../models/planet";
import { VehicleIntf } from "../../models/vehicle";
import { FindFalconeRequest } from "../../models/findingFalconeRequest";
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs";
import { Token } from "@angular/compiler";
import { FindFalconeResponseInf } from "src/app/models/findFalconeResponse";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FindingFalconeService {
  apiBaseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getPlanets(): Observable<PlanetIntf[]> {
    return this.http.get<PlanetIntf[]>(this.apiBaseUrl + "planets").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getVehicles(): Observable<VehicleIntf[]> {
    return this.http.get<VehicleIntf[]>(this.apiBaseUrl + "vehicles").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getToken(): Observable<Token> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json"
      })
    };
    return this.http
      .post<Token>(this.apiBaseUrl + "token", "", httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  findingFalcone(
    falconeFindRequest: FindFalconeRequest
  ): Observable<FindFalconeResponseInf> {
    const httpHeaders = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-type": "application/json"
      })
    };
    return this.http
      .post<FindFalconeResponseInf>(
        this.apiBaseUrl + "find",
        falconeFindRequest,
        httpHeaders
      )
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${
        err.message
      }`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
