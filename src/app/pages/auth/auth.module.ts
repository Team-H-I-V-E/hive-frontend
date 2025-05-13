import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { CreateAccountComponent } from "./create-account/create-account.component";

@NgModule ({

    declarations: [
        CreateAccountComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}