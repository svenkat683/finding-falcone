import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FindingFalconeService } from "../../services/falcone/finding-falcone.service";
import { PlanetIntf } from "src/app/models/planet";
import { VehicleIntf } from "src/app/models/vehicle";
import { FindFalconeRequest } from "src/app/models/findingFolconeRequest";
import { SelectedDestination } from "src/app/models/selectedDestination";
import { MessageService } from "src/app/services/message/message.service";
import { FindFalconeResponseInf } from "src/app/models/findFalconeResponse";

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
  timeToReachDestination = 0;
  constructor(
    private findFacloneHttp: FindingFalconeService,
    private router: Router,
    public messageService: MessageService
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
      (error) => {
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
      (error) => {
        console.log(error);
      }
    );
  }

  getToken() {
    this.findFacloneHttp.getToken().subscribe(
      (response: any) => {
        this.token = response.token;
      },
      (error) => {
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
        (destination) =>
          destination.destinationNumber ===
          selectedDestination.destinationNumber
      )
    ) {
      this.selectedDestinations = this.selectedDestinations.filter(
        (destination) =>
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
    let timeTaken = 0;
    this.selectedDestinations.map((destination: SelectedDestination) => {
      const planet = this.planets.find(
        (singlePlanet) => singlePlanet.name === destination.planetName
      );
      const vehicle = this.vehicles.find(
        (singleVehicle) => singleVehicle.name === destination.vehicleName
      );
      timeTaken += planet.distance / vehicle.speed;
    });
    return timeTaken;
  }

  organizeAvailablePlanets(selectedDestination: SelectedDestination) {
    this.availablePlanets = this.availablePlanets.filter(
      (planet) => planet.name !== selectedDestination.planetName
    );
  }

  findFalcone() {
    const findFalconeRequest: FindFalconeRequest = new FindFalconeRequest();
    const planet_names: Array<string> = [];
    const vehicle_names: Array<string> = [];
    this.selectedDestinations.map((destination: SelectedDestination) => {
      planet_names.push(destination.planetName);
      vehicle_names.push(destination.vehicleName);
    });
    findFalconeRequest.token = this.token;
    findFalconeRequest.planet_names = [...planet_names];
    findFalconeRequest.vehicle_names = [...vehicle_names];

    console.log("findFalconeRequest: ", this.token);

    this.messageService.setFindFalconeRequest(findFalconeRequest);
    this.messageService.setTimeTaken(this.timeToReachDestination);
    this.router.navigate(["/result"]);
    console.log("findFalconeResponse", findFalconeRequest);
  }
}
