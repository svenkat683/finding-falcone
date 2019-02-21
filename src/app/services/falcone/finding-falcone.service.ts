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
  constructor() {}
}
