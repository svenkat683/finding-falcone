import { Component, OnInit } from "@angular/core";
import { MessageService } from "src/app/services/message/message.service";
import { FindFalconeResponseInf } from "src/app/models/findFalconeResponse";
import { FindFalconeRequest } from "src/app/models/findingFalconeRequest";
import { FindingFalconeService } from "src/app/services/falcone/finding-falcone.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
  planetFoundStatus: string;
  planetFound: string;
  planetFoundError: string;
  timeTakenToFindFalcone: number;
  constructor(
    public messageService: MessageService,
    private findingFalconeService: FindingFalconeService
  ) {}

  ngOnInit() {
    this.findFalcone();
    this.timeTakenToFindFalcone = this.messageService.getTimeTakenToFindFalcone();
    console.log(this.timeTakenToFindFalcone, this.planetFound);
  }

  findFalcone() {
    const findFalconeRequest: FindFalconeRequest = this.messageService.getFindFalconeRequest();
    this.findingFalconeService
      .findingFalcone(findFalconeRequest)
      .subscribe((findFalconeResponse: FindFalconeResponseInf) => {
        this.planetFoundStatus = findFalconeResponse.status
          ? findFalconeResponse.status
          : "";
        this.planetFound = findFalconeResponse.planet_name
          ? findFalconeResponse.planet_name
          : "";
        this.planetFoundError = findFalconeResponse.error
          ? findFalconeResponse.error
          : "";
      });
  }
}
