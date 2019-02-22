import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { FindingFalconeService } from "./finding-falcone.service";
import { PlanetIntf } from "src/app/models/planet";

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

  it("should create FindingFalocne Service", () => {
    const service = TestBed.get(FindingFalconeService);
    expect(service).toBeTruthy();
  });

  describe("#getPlanets", () => {
    it("should return an Observable<Planet[]>", () => {
      const dummyResponse = [
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
});
