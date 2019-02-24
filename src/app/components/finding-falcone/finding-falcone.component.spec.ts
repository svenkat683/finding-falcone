import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FindingFalconeComponent } from "./finding-falcone.component";
import { DestinationComponent } from "../destination/destination.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FindingFalconeService } from "src/app/services/falcone/finding-falcone.service";
import { PlanetIntf } from "src/app/models/planet";
import { VehicleIntf } from "src/app/models/vehicle";
import { of } from "rxjs";
import { Token } from "src/app/models/token";
import { SelectedDestination } from "src/app/models/selectedDestination";
import { MessageService } from "src/app/services/message/message.service";
import { Router } from "@angular/router";

describe("FindingFalconeComponent", () => {
  let component: FindingFalconeComponent;
  let fixture: ComponentFixture<FindingFalconeComponent>;
  let router = {
    navigate: jasmine.createSpy("navigate")
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [FindingFalconeComponent, DestinationComponent],
      providers: [FindingFalconeService, { provide: Router, useValue: router }]
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

  describe("#getPlanets", () => {
    it("should use #planets from the #findingFalcone service", () => {
      const fakePlanets: PlanetIntf[] = [
        { name: "Donlon", distance: 100 },
        { name: "Enchai", distance: 200 },
        { name: "Jebing", distance: 300 },
        { name: "Sapir", distance: 400 },
        { name: "Lerbin", distance: 500 },
        { name: "Pingasor", distance: 600 }
      ];
      const findingFalconeService = fixture.debugElement.injector.get(
        FindingFalconeService
      );
      spyOn(findingFalconeService, "getPlanets").and.returnValue(
        of(fakePlanets)
      );
      component.ngOnInit();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(findingFalconeService.getPlanets).toHaveBeenCalled();
        expect(component.availablePlanets).toEqual(fakePlanets);
        expect(component.planets).toEqual(fakePlanets);
      });
    });
  });

  describe("#getPlanets", () => {
    it("should use #planets from the #findingFalcone service", () => {
      const fakeVehicles: VehicleIntf[] = [
        { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
        { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
        { name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5 },
        { name: "Space ship", total_no: 2, max_distance: 600, speed: 10 }
      ];
      const findingFalconeService = fixture.debugElement.injector.get(
        FindingFalconeService
      );
      spyOn(findingFalconeService, "getVehicles").and.returnValue(
        of(fakeVehicles)
      );
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(findingFalconeService.getVehicles).toHaveBeenCalled();
        expect(component.vehicles).toEqual(fakeVehicles);
      });
      component.ngOnInit();
    });
  });

  describe("#getToken", () => {
    it("should use #planets from the #findingFalcone service", () => {
      const fakeToken: Token = {
        token: "dfasdmkflsdmflsdmfsdlfkmalsdf"
      };
      const findingFalconeService = fixture.debugElement.injector.get(
        FindingFalconeService
      );
      spyOn(findingFalconeService, "getToken").and.returnValue(of(fakeToken));
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(findingFalconeService.getToken).toHaveBeenCalled();
        expect(component.token).toEqual(fakeToken.token);
      });
      component.ngOnInit();
    });
  });

  describe("#organizeAvailablePlanets", () => {
    it("should filter the availablePlanets when one destination given as input", () => {
      const dummyInput: SelectedDestination = {
        destinationNumber: 1,
        vehicleName: "Space Pod",
        planetName: "Donlon"
      };
      component.ngOnInit();
      const before = (component.availablePlanets = [
        { name: "Donlon", distance: 100 },
        { name: "Enchai", distance: 200 },
        { name: "Jebing", distance: 300 },
        { name: "Sapir", distance: 400 },
        { name: "Lerbin", distance: 500 },
        { name: "Pingasor", distance: 600 }
      ]);
      component.organizeAvailablePlanets(dummyInput);
      expect(component.availablePlanets.length).toBeLessThan(before.length);
    });
  });

  describe("#organizeSelectedDestinations", () => {
    it("should push selectedDestination to selectedDestinations array if it's not presented.", () => {
      const dummySelectedDestination: SelectedDestination = new SelectedDestination(
        1,
        "Donlon",
        "Space Pod"
      );
      const before = (component.selectedDestinations = []);
      component.organizeSelectedDestinations(dummySelectedDestination);
      expect(component.selectedDestinations.length).toBeGreaterThan(
        before.length
      );
    });
  });

  describe("#organizeAvailableVehicles", () => {
    it("should decrement vehicle count if it's selected.", () => {
      const beforeVehicleCount = (component.vehicles = [
        { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 }
      ]);
      const dummySelectedDestination: SelectedDestination = new SelectedDestination(
        1,
        "Donlon",
        "Space pod"
      );
      component.organizeAvailableVehicles(dummySelectedDestination);
      expect(component.vehicles[0].total_no).toEqual(1);
    });
  });

  describe("#getTimeTakenToReachDestination", () => {
    it("should return time taken to reach the destination", () => {
      component.selectedDestinations = [
        {
          destinationNumber: 1,
          planetName: "Sapir",
          vehicleName: "Space pod"
        }
      ];

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
      const timeTaken = component.getTimeTakenToReachDestination();
      expect(timeTaken).toEqual(200);
    });
  });

  describe("#findFalcone", () => {
    it("should call #setFindFalconeRequest, #setTimeTaken message service method", () => {
      component.selectedDestinations = [
        {
          destinationNumber: 1,
          planetName: "Sapir",
          vehicleName: "Space pod"
        },
        {
          destinationNumber: 1,
          planetName: "Jebing",
          vehicleName: "Space rocket"
        },
        {
          destinationNumber: 3,
          planetName: "Lerbin",
          vehicleName: "Space pod"
        },
        {
          destinationNumber: 4,
          planetName: "Pingasor",
          vehicleName: "Space ship"
        }
      ];

      const messageService = fixture.debugElement.injector.get(MessageService);
      messageService.findFalconeRequest = {
        token: "sdfjadskfnsldkfnasfnkd",
        planet_names: ["Lerbin", "Donlon", "Enchai", "Pingasor"],
        vehicle_names: ["Space Pod", "Space pod", "Space ship", "Space ship"]
      };
      messageService.timeTaken = 260;
      spyOn(messageService, "setFindFalconeRequest");
      spyOn(messageService, "setTimeTaken");
      component.findFalcone();
      expect(component.messageService.setFindFalconeRequest).toHaveBeenCalled();
      expect(component.messageService.setTimeTaken).toHaveBeenCalled();
      expect(component.messageService.findFalconeRequest).toBe(
        messageService.findFalconeRequest
      );
      expect(component.messageService.timeTaken).toEqual(260);
      expect(router.navigate).toHaveBeenCalledWith(["/result"]);
    });
  });
});
