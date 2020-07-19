import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { AuthGuard } from '../auth/auth-guard.service';
// Components
import { CsvHomeComponent } from './csv-home/csv-home.component';


// les routes du module Pokémon
const CSVRoutes: Routes = [
    {
        path: 'csv',
        // canActivate: [AuthGuard],
        children: [
            { path: 'home', component: CsvHomeComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(CSVRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CSVRoutingModule { }
