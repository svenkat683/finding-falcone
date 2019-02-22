import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { FindingFalconeService } from "./finding-falcone.service";

describe("FindingFalconeService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should create FindingFalocne Service", () => {
    const service = TestBed.get(FindingFalconeService);
    expect(service).toBeTruthy();
  });
});
