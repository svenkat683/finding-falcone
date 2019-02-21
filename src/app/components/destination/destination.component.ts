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

  @Input() destinationIndex: number;

  @Output() selectedDestination = new EventEmitter<SelectedDestination>();

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
    const destination = new SelectedDestination(
      this.destinationIndex,
      this.destinationFormGroup.value.planetName,
      this.destinationFormGroup.value.vehicle
    );
    this.selectedPlanetName = this.destinationFormGroup.value.planetName;
    this.destinationFormGroup.patchValue({
      selectedPlanetName: this.destinationFormGroup.value.planetName
    });
    this.emitSelectDestination(destination);
  }

  emitSelectDestination(selectedDestination: SelectedDestination) {
    this.selectedDestination.emit(selectedDestination);
  }
}
