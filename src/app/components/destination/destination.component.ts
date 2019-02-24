import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef
} from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { VehicleIntf } from "src/app/models/vehicle";
import { PlanetIntf } from "src/app/models/planet";
import { SelectedDestination } from "src/app/models/selectedDestination";

@Component({
  selector: "app-destination",
  templateUrl: "./destination.component.html",
  styleUrls: ["./destination.component.css"]
})
export class DestinationComponent implements OnInit, AfterViewChecked {
  @Input() vehicles: VehicleIntf[];

  @Input() planets: PlanetIntf[];

  @Input() totalPlanets: PlanetIntf[];

  @Input() destinationIndex: number;

  @Output() selectedDestination = new EventEmitter<SelectedDestination>();

  isVehicleValidErrorMessage = false;
  selectedPlanetName: string;
  constructor(
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}
  destinationFormGroup: FormGroup;
  ngOnInit() {
    this.destinationFormGroup = this.formBuilder.group({
      planetName: [""],
      vehicle: [""],
      selectedPlanetName: [""]
    });
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  onSelectVehicle() {
    this.selectedPlanetName = this.destinationFormGroup.value.planetName;
    this.destinationFormGroup.patchValue({
      selectedPlanetName: this.destinationFormGroup.value.planetName
    });
    if (this.isVehicleValid()) {
      const destination = new SelectedDestination(
        this.destinationIndex,
        this.destinationFormGroup.value.planetName,
        this.destinationFormGroup.value.vehicle
      );
      this.emitSelectDestination(destination);
    }
    return;
  }

  emitSelectDestination(selectedDestination: SelectedDestination) {
    this.selectedDestination.emit(selectedDestination);
  }

  isVehicleValid() {
    this.isVehicleValidErrorMessage = false;
    const selectedVehicle = this.destinationFormGroup.value.vehicle;
    const selectedPlanetName = this.destinationFormGroup.value.planetName;
    console.log("planet", this.totalPlanets);
    const vehicle: VehicleIntf = this.findPropertyByName(
      selectedVehicle,
      this.vehicles
    );
    const planet: PlanetIntf = this.findPropertyByName(
      selectedPlanetName,
      this.totalPlanets
    );
    if (vehicle.max_distance < planet.distance) {
      this.isVehicleValidErrorMessage = true;
      return false;
    }
    return true;
  }

  findPropertyByName(property: any, originalObject: any) {
    return originalObject.find(object => object.name === property);
  }
}
