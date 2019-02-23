import { TestBed, getTestBed } from "@angular/core/testing";

import { MessageService } from "./message.service";
import { FindFalconeRequest } from "src/app/models/findingFolconeRequest";

describe("MessageService", () => {
  let injector: TestBed;
  let service: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    injector = getTestBed();
    service = injector.get(MessageService);
  });

  it("should be created", () => {
    const service: MessageService = TestBed.get(MessageService);
    expect(service).toBeTruthy();
  });

  describe("#setFindFalconeRequest()", () => {
    it("should call setFindFalconeRequest() with findFalconeRequest as parameter", () => {
      let dummyFindFalconeRequest: FindFalconeRequest = {
        token: "sdfjansdkfnsdlkfmasdkfjsd",
        planet_names: ["Sapir", "Donlon", "Enchai", "Pingasor"],
        vehicle_names: [
          "Space Pod",
          "Space pod",
          "Space Rocket",
          "Space Rocket"
        ]
      };
      spyOn(service, "setFindFalconeRequest").and.callThrough();
      service.setFindFalconeRequest(dummyFindFalconeRequest);
      expect(service.setFindFalconeRequest).toHaveBeenCalled();
      expect(service.setFindFalconeRequest).toHaveBeenCalledWith(
        dummyFindFalconeRequest
      );
    });
  });

  describe("#setTimeTaken()", () => {
    const dummyTimeTaken: number = 230;
    it("should call setTimeToken() with timeTaken as parameter", () => {
      spyOn(service, "setTimeTaken").and.callThrough();
      service.setTimeTaken(dummyTimeTaken);
      expect(service.setTimeTaken).toHaveBeenCalled();
      expect(service.setTimeTaken).toHaveBeenCalledWith(dummyTimeTaken);
    });
  });

  describe("#getFindFalconeRequest()", () => {
    it("should call getFindFalconeRequest()  and should return findFalconeRequest ", () => {
      let dummyFindFalconeRequest: FindFalconeRequest = {
        token: "sdfjansdkfnsdlkfmasdkfjsd",
        planet_names: ["Sapir", "Donlon", "Enchai", "Pingasor"],
        vehicle_names: [
          "Space Pod",
          "Space pod",
          "Space Rocket",
          "Space Rocket"
        ]
      };
      spyOn(service, "getFindFalconeRequest").and.returnValue(
        dummyFindFalconeRequest
      );
      service.getFindFalconeRequest();
      expect(service.getFindFalconeRequest).toHaveBeenCalled();
      expect(service.getFindFalconeRequest).toHaveBeenCalledWith();
    });
  });

  describe("#getTimeTaken()", () => {
    const dummyTimeTaken: number = 230;
    it("should call setTimeToken() and  should return timeTaken", () => {
      spyOn(service, "getTimeTakenToFindFalcone").and.returnValue(
        dummyTimeTaken
      );
      service.getTimeTakenToFindFalcone();
      expect(service.getTimeTakenToFindFalcone).toHaveBeenCalled();
      expect(service.getTimeTakenToFindFalcone).toHaveBeenCalledWith();
    });
  });
});
