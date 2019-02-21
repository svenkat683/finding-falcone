import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FindingFalconeService } from "../../services/falcone/finding-falcone.service";
import { PlanetIntf } from "src/app/models/planet";
import { VehicleIntf } from "src/app/models/vehicle";
import { FindFalconeRequest } from "src/app/models/findingFolconeRequest";
import { SelectedDestination } from "src/app/models/selectedDestination";

@Component({
  selector: "app-finding-falcone",
  templateUrl: "./finding-falcone.component.html",
  styleUrls: ["./finding-falcone.component.css"]
})
export class FindingFalconeComponent implements OnInit {
  planets: PlanetIntf[];
  vehicles: VehicleIntf[];
  availablePlanets: PlanetIntf[];
  token: string;
  selectedDestinations: SelectedDestination[] = [];
  timeToReachDestination: number = 0;
  constructor(
    private findFacloneHttp: FindingFalconeService,
    private router: Router
  ) {}

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
        this.availablePlanets = [...planets];
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
      (response: any) => {
        this.token = response.token;
      },
      error => {
        console.log(error);
      }
    );
  }

  onSelectedDestination(selectedDestination: SelectedDestination) {
    this.organizeSelectedDestinations(selectedDestination);
    this.organizeAvailableVehicles(selectedDestination);
    this.organizeAvailablePlanets(selectedDestination);
    this.timeToReachDestination = this.getTimeTakenToReachDestination();
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

  getTimeTakenToReachDestination() {
    let timeTaken: number = 0;
    this.selectedDestinations.map((destination: SelectedDestination) => {
      const planet = this.planets.find(
        planet => planet.name === destination.planetName
      );
      const vehicle = this.vehicles.find(
        vehicle => vehicle.name === destination.vehicleName
      );
      timeTaken += planet.distance / vehicle.speed;
    });
    return timeTaken;
  }

  organizeAvailablePlanets(selectedDestination: SelectedDestination) {
    this.availablePlanets = this.availablePlanets.filter(
      planet => planet.name !== selectedDestination.planetName
    );
  }

  findFalcone() {
    let findFalconeRequest: FindFalconeRequest = new FindFalconeRequest();
    let planet_names: Array<string> = [];
    let vehicle_names: Array<string> = [];
    this.selectedDestinations.map((destination: SelectedDestination) => {
      planet_names.push(destination.planetName);
      vehicle_names.push(destination.vehicleName);
    });
    findFalconeRequest.token = this.token;
    findFalconeRequest.planet_names = [...planet_names];
    findFalconeRequest.vehicle_names = [...vehicle_names];

    console.log("findFalconeRequest: ", this.token);

    this.findFacloneHttp
      .findngFalcone(findFalconeRequest)
      .subscribe((findFalconeResponse: any) => {
        console.log("findFalconeResponse", findFalconeResponse);
      });
  }
}
