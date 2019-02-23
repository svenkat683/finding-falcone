import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FindingFalconeComponent } from "./finding-falcone.component";
import { DestinationComponent } from "../destination/destination.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FindingFalconeService } from "src/app/services/falcone/finding-falcone.service";

describe("FindingFalconeComponent", () => {
  let component: FindingFalconeComponent;
  let fixture: ComponentFixture<FindingFalconeComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [FindingFalconeComponent, DestinationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingFalconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not have #planets, #vehicles, #availablePlanets and #token after construction", () => {
    expect(component.planets).toBeUndefined();
    expect(component.vehicles).toBeUndefined();
    expect(component.availablePlanets).toBeUndefined();
    expect(component.token).toBeUndefined();
  });

  it("#electedDestinations should be array with length zero after construction", () => {
    expect(component.selectedDestinations.length).toBe(0);
  });

  describe("#ngOnInit()", () => {
    it("Should call ngOnInit method", () => {
      component.ngOnInit();
      fixture.whenStable().then(() => {
        spyOn(component, "getPlanets");
        spyOn(component, "getVehicles");
        spyOn(component, "getToken");
        component.getPlanets();
        component.getVehicles();
        component.getToken();
        expect(component.getPlanets).toHaveBeenCalled();
        expect(component.getVehicles).toHaveBeenCalled();
        expect(component.getToken).toHaveBeenCalled();
      });
    });
  });
});
