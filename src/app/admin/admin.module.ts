import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AdminComponent } from "./admin.component";
import { AuthGard } from "./auth.gard";

let routing = RouterModule.forChild([
    { path: "auth", component: AuthComponent },
    { path: "main", component: AdminComponent, canActivate: [AuthGard] },
    { path: "**", redirectTo: "auth" },
])

@NgModule({
    imports: [CommonModule, FormsModule, routing],
    providers: [AuthGard],
    declarations: [AuthComponent, AdminComponent]
})
export class AdminModule{}