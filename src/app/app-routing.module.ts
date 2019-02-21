import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FindingFalconeComponent } from "./components/finding-falcone/finding-falcone.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "finding-falcone",
    pathMatch: "full"
  },
  {
    path: "finding-falcone",
    component: FindingFalconeComponent
  },
  {
    path: "**",
    redirectTo: "finding-falcone",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
