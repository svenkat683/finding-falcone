import { Component, OnInit } from "@angular/core";
import { FindingFalconeService } from "../../services/falcone/finding-falcone.service";
import { Planet } from "src/app/models/planet";
import { Vehicle } from "src/app/models/vehicle";

@Component({
  selector: "app-finding-falcone",
  templateUrl: "./finding-falcone.component.html",
  styleUrls: ["./finding-falcone.component.css"]
})
export class FindingFalconeComponent implements OnInit {
  planets: Planet[];
  vehicles: Vehicle[];
  token: string;
  constructor(private findFacloneHttp: FindingFalconeService) {}

  ngOnInit() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  getPlanets() {
    this.findFacloneHttp.getPlanets().subscribe(
      (planets: Planet[]) => {
        console.log("Planets", planets);
        this.planets = planets;
      },
      error => {
        console.error(error);
      }
    );
  }

  getVehicles() {
    this.findFacloneHttp.getVehicles().subscribe(
      (vehicles: Vehicle[]) => {
        console.log("vehicles", vehicles);
        this.vehicles = vehicles;
      },
      error => {
        console.log(error);
      }
    );
  }

  getToken() {
    this.findFacloneHttp.getToken().subscribe(
      (token: string) => {
        console.log("Token", token);
        this.token = token;
      },
      error => {
        console.log(error);
      }
    );
  }
}
