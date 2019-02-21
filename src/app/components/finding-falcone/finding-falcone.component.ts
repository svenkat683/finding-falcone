import { Component, OnInit } from "@angular/core";
import { FindingFalconeService } from "../../services/falcone/finding-falcone.service";
import { PlanetIntf } from "src/app/models/planet";
import { VehicleIntf } from "src/app/models/vehicle";
import { SelectedDestination } from "src/app/models/selectedDestination";

@Component({
  selector: "app-finding-falcone",
  templateUrl: "./finding-falcone.component.html",
  styleUrls: ["./finding-falcone.component.css"]
})
export class FindingFalconeComponent implements OnInit {
  planets: PlanetIntf[];
  vehicles: VehicleIntf[];
  availablePlanents: PlanetIntf[];
  token: string;
  selectedDestinations: SelectedDestination[] = [];
  constructor(private findFacloneHttp: FindingFalconeService) {}

  ngOnInit() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();
  }

  getPlanets() {
    this.findFacloneHttp.getPlanets().subscribe(
      (planets: PlanetIntf[]) => {
        console.log("Planets", planets);
        this.planets = [...planets];
        this.availablePlanents = [...planets];
      },
      error => {
        console.error(error);
      }
    );
  }

  getVehicles() {
    this.findFacloneHttp.getVehicles().subscribe(
      (vehicles: VehicleIntf[]) => {
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

  onSelectedDestination(selectedDestination: SelectedDestination) {
    this.organizeSelectedDestinations(selectedDestination);
    this.organizeAvailableVehicles(selectedDestination);
    console.log("selectedDest", this.vehicles);
  }

  organizeSelectedDestinations(selectedDestination: SelectedDestination) {
    if (
      this.selectedDestinations.find(
        destination =>
          destination.destinationNumber == selectedDestination.destinationNumber
      )
    ) {
      this.selectedDestinations = this.selectedDestinations.filter(
        destination =>
          destination.destinationNumber !==
          selectedDestination.destinationNumber
      );
    }

    this.selectedDestinations = [
      ...this.selectedDestinations,
      selectedDestination
    ];
  }

  organizeAvailableVehicles(selectedDestination: SelectedDestination) {
    const vehicleName: string = selectedDestination.vehicleName;
    this.vehicles.map((vehicle: VehicleIntf) => {
      if (vehicle.name === vehicleName && vehicle.total_no > 0) {
        vehicle.total_no--;
      }
    });
  }
}
