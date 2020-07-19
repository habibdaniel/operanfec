import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
// Services
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule { }
