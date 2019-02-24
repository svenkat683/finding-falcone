import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DestinationComponent } from "./destination.component";
import { SelectedDestination } from "src/app/models/selectedDestination";
import { EventEmitter } from "@angular/core";
import { VehicleIntf } from "src/app/models/vehicle";
import { PlanetIntf } from "src/app/models/planet";

describe("DestinationComponent", () => {
  let component: DestinationComponent;
  let fixture: ComponentFixture<DestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [DestinationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not have #planets, #vehicles, #totalPlanets, #destinationIndex, and #selectedPlanetName  after construction", () => {
    expect(component.planets).toBeUndefined();
    expect(component.vehicles).toBeUndefined();
    expect(component.totalPlanets).toBeUndefined();
    expect(component.destinationIndex).toBeUndefined();
    expect(component.selectedPlanetName).toBeUndefined();
  });

  describe("#emitSelectDestination", () => {
    it("should emit selectedDestination", () => {
      let destination: SelectedDestination = new SelectedDestination(
        1,
        "Donlon",
        "Space pod"
      );
      component.selectedDestination.subscribe(
        dest => (destination = destination)
      );
      expect(destination.destinationNumber).toBe(1);
      expect(destination.planetName).toBe("Donlon");
      expect(destination.vehicleName).toBe("Space pod");
    });
  });

  describe("#isVehicleValid", () => {
    it("should verify whether vehicle valid or not based on planet destance", () => {
      component.isVehicleValidErrorMessage = false;
      component.destinationFormGroup.value.vehicle = "Space pod";
      component.destinationFormGroup.value.planetName = "Donlon";
      const vehicle: VehicleIntf = {
        name: "Space ship",
        total_no: 2,
        max_distance: 600,
        speed: 10
      };
      const planet: PlanetIntf = {
        name: "Donlon",
        distance: 100
      };
      component.planets = [
        { name: "Donlon", distance: 100 },
        { name: "Enchai", distance: 200 },
        { name: "Jebing", distance: 300 },
        { name: "Sapir", distance: 400 },
        { name: "Lerbin", distance: 500 },
        { name: "Pingasor", distance: 600 }
      ];

      component.vehicles = [
        { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
        { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
        { name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5 },
        { name: "Space ship", total_no: 2, max_distance: 600, speed: 10 }
      ];
      spyOn(component, "findPropertyByName").and.returnValues(planet, vehicle);
      const result = component.isVehicleValid();
      expect(component.findPropertyByName).toHaveBeenCalled();
      expect(result).toEqual(true);
    });
  });
});
