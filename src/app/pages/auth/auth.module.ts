import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { LoginComponent } from "./login/login.component";

@NgModule ({

    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AuthRoutingModule,
        CreateAccountComponent,
        LoginComponent,
    ]
})
export class AuthModule {}