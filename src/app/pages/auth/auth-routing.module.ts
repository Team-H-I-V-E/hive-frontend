import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateAccountComponent } from './create-account/create-account.component'
import { LoginComponent } from "./login/login.component";

const route: Routes = [
    { path: 'signup', component: CreateAccountComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}