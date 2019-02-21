import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FindingFalconeComponent } from "./components/finding-falcone/finding-falcone.component";
import { ResultComponent } from "./components/result/result.component";

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
    path: "result",
    component: ResultComponent
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
