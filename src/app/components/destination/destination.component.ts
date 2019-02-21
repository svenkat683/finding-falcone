import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { VehicleIntf } from "src/app/models/vehicle";
import { PlanetIntf } from "src/app/models/planet";

@Component({
  selector: "app-destination",
  templateUrl: "./destination.component.html",
  styleUrls: ["./destination.component.css"]
})
export class DestinationComponent implements OnInit {
  @Input() vehicles: VehicleIntf[];

  @Input() planets: PlanetIntf[];

  @Input() destinationIndex: number;

  selectedPlanetName: string;
  constructor(private formBuilder: FormBuilder) {}
  destinationFormGroup: FormGroup;
  ngOnInit() {
    this.destinationFormGroup = this.formBuilder.group({
      planetName: [""],
      vehicle: [""],
      selectedPlanet: [""]
    });
  }

  onSelectDestination() {
    console.log(
      "Selected Planet",
      this.destinationFormGroup.value.selectedPlanet
    );
    console.log("Selected vehicle", this.destinationFormGroup.value.vehicle);
    console.log(
      "Selected PlanetName",
      this.destinationFormGroup.value.planetName
    );
  }
}
