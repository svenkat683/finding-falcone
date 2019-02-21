import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-destination",
  templateUrl: "./destination.component.html",
  styleUrls: ["./destination.component.css"]
})
export class DestinationComponent implements OnInit {
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
