import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FindingFalconeComponent } from "./finding-falcone.component";
import { DestinationComponent } from "../destination/destination.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
});
