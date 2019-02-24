import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { HeaderComponent } from "./header.component";
import { By } from "@angular/platform-browser";
import { FindingFalconeComponent } from "../finding-falcone/finding-falcone.component";
import { DestinationComponent } from "../destination/destination.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [
        HeaderComponent,
        FindingFalconeComponent,
        DestinationComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should click button reset", () => {
    const button = fixture.debugElement.query(By.css(".reset")).nativeElement;
    const href = button.getAttribute("href");
    expect(href).toEqual("/finding-falcone");
  });
});
