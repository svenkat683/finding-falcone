import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Vehicle } from "src/app/models/vehicle";
import { Planet } from "src/app/models/planet";

@Component({
  selector: "app-destination",
  templateUrl: "./destination.component.html",
  styleUrls: ["./destination.component.css"]
})
export class DestinationComponent implements OnInit {
  @Input() vehicles: Vehicle[];

  @Input() planets: Planet[];

  @Input() destinationIndex: number;
  constructor(private formBuilder: FormBuilder) {}
  destinationFormGroup: FormGroup;
  ngOnInit() {
    this.destinationFormGroup = this.formBuilder.group({
      planetName: [""],
      vehicle: [""],
      selectedPlanet: [""]
    });
  }
}
