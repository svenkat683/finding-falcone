import { Injectable } from "@angular/core";
import { FindFalconeResponseInf } from "src/app/models/findFalconeResponse";
import { FindFalconeRequest } from "src/app/models/findingFolconeRequest";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  findFalconeRequest: FindFalconeRequest;
  timeTaken: number;
  constructor() {}

  setFindFalconeRequest(findFalconeRequest: FindFalconeRequest): void {
    this.findFalconeRequest = findFalconeRequest;
  }

  setTimeTaken(timeTaken: number): void {
    this.timeTaken = timeTaken;
  }

  getFindFalconeRequest(): FindFalconeRequest {
    return this.findFalconeRequest;
  }

  getTimeTakenToFindFalcone(): number {
    return this.timeTaken;
  }
}
