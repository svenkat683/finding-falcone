import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ResultComponent } from "./result.component";
import { FindingFalconeService } from "src/app/services/falcone/finding-falcone.service";
import { MessageService } from "src/app/services/message/message.service";
import { FindFalconeRequest } from "src/app/models/findingFalconeRequest";
import { of } from "rxjs";
import { FindFalconeResponseInf } from "src/app/models/findFalconeResponse";

describe("ResultComponent", () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ResultComponent],
      providers: [FindingFalconeService, MessageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("#findFalcone", () => {
    it("should give status of the faclone found or not", () => {
      const findingFalconeService = fixture.debugElement.injector.get(
        FindingFalconeService
      );
      const findFalconeRequest: FindFalconeRequest = {
        token: "sdfjadskfnsldkfnasfnkd",
        planet_names: ["Lerbin", "Donlon", "Enchai", "Pingasor"],
        vehicle_names: ["Space Pod", "Space pod", "Space ship", "Space ship"]
      };
      const findFalconeResponse: FindFalconeResponseInf = {
        planet_name: "",
        status: "",
        error: ""
      };
      const messageService = fixture.debugElement.injector.get(MessageService);
      spyOn(findingFalconeService, "findingFalcone").and.returnValue(
        of(findFalconeResponse)
      );
      spyOn(messageService, "getFindFalconeRequest").and.returnValue(
        of(findFalconeRequest)
      );
      component.findFalcone();
      expect(messageService.getFindFalconeRequest).toHaveBeenCalled();
      expect(findingFalconeService.findingFalcone).toHaveBeenCalled();
    });
  });
});
