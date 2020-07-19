import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login/login.component';


// les routes du module Authentication
const authRoutes: Routes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }
