import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { FindingFalconeService } from "./finding-falcone.service";
import { PlanetIntf } from "src/app/models/planet";
import { VehicleIntf } from "src/app/models/vehicle";
import { Token } from "src/app/models/token";
import { FindFalconeRequest } from "src/app/models/findingFalconeRequest";
import { FindFalconeResponseInf } from "src/app/models/findFalconeResponse";

describe("FindingFalconeService", () => {
  let injector: TestBed;
  let service: FindingFalconeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FindingFalconeService]
    });

    injector = getTestBed();
    service = injector.get(FindingFalconeService);
    httpMock = injector.get(HttpTestingController);
  });

  it("should create FindingFalcone Service", () => {
    expect(service).toBeTruthy();
  });

  describe("#getPlanets", () => {
    it("should return an Observable<Planet[]>", () => {
      const dummyResponse: PlanetIntf[] = [
        { name: "Donlon", distance: 100 },
        { name: "Enchai", distance: 200 },
        { name: "Jebing", distance: 300 },
        { name: "Sapir", distance: 400 },
        { name: "Lerbin", distance: 500 },
        { name: "Pingasor", distance: 600 }
      ];
      const apiBaseUrl = service.apiBaseUrl;

      service.getPlanets().subscribe((planets: PlanetIntf[]) => {
        expect(planets.length).toBe(6);
        expect(planets).toEqual(dummyResponse);

        const mockRequest = httpMock.expectOne(apiBaseUrl + "planets");
        expect(mockRequest.request.method).toBe("GET");
        mockRequest.flush(dummyResponse);
      });
    });
  });

  describe("#getVehicles", () => {
    it("should return an Observable<Vehicle[]>", () => {
      const dummyResponse: VehicleIntf[] = [
        { name: "Space pod", total_no: 2, max_distance: 200, speed: 2 },
        { name: "Space rocket", total_no: 1, max_distance: 300, speed: 4 },
        { name: "Space shuttle", total_no: 1, max_distance: 400, speed: 5 },
        { name: "Space ship", total_no: 2, max_distance: 600, speed: 10 }
      ];
      const apiBaseUrl = service.apiBaseUrl;

      service.getVehicles().subscribe((vehicles: VehicleIntf[]) => {
        expect(vehicles.length).toBe(4);
        expect(vehicles).toEqual(dummyResponse);

        const mockRequest = httpMock.expectOne(apiBaseUrl + "vehicles");
        expect(mockRequest.request.method).toBe("GET");
        mockRequest.flush(dummyResponse);
      });
    });
  });

  describe("#getToken", () => {
    it("should return an Observable<Token>", () => {
      const dummyResponse: Token = {
        token: "dfasdmkflsdmflsdmfsdlfkmalsdf"
      };

      const apiBaseUrl = service.apiBaseUrl;
      service.getToken().subscribe((token: object) => {
        expect(token).toEqual(dummyResponse);
        const mockRequest = httpMock.expectOne(apiBaseUrl + "vehicles", "");
        expect(mockRequest.request.method).toBe("POST");
        mockRequest.flush(dummyResponse);
      });
    });
  });

  describe("#findFalcone", () => {
    it("should return an Observable<FindFalconeResponseInf>", () => {
      const dummyRequest: FindFalconeRequest = {
        token: "sdfjadskfnsldkfnasfnkd",
        planet_names: ["Sapir", "Donlon", "Enchai", "Pingasor"],
        vehicle_names: [
          "Space Pod",
          "Space pod",
          "Space Rocket",
          "Space Rocket"
        ]
      };

      const dummyResponse: FindFalconeResponseInf = {
        planet_name: "Donlon",
        status: "success"
      };
      const apiBaseUrl = service.apiBaseUrl;
      service
        .findingFalcone(dummyRequest)
        .subscribe((res: FindFalconeResponseInf) => {
          expect(res.status).toBe(dummyResponse.status);
          expect(res.planet_name).toBe(dummyResponse.planet_name);

          const mockRequest = httpMock.expectOne(
            apiBaseUrl + "find",
            "returned success response with planet name"
          );
          expect(mockRequest.request.method).toBe("POST");
          mockRequest.flush(dummyResponse);
        });
    });
  });
});
