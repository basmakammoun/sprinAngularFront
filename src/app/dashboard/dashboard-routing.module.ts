import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientFormComponent } from './client-form/client-form.component';

import { DashboardLayoutComponent } from '../layouts/dashboard-layout/dashboard-layout.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountFormComponent } from './account-form/account-form.component';


const routes: Routes = [
      {
        path:'client',
        component:ClientsListComponent,
      },
      {
        path:'client-form',
        component:ClientFormComponent,
      },
      {
        path: 'client/:cin/update',
        pathMatch: 'full',
        component: ClientFormComponent,
      },
      {
        path: 'client/:cin/account',
        pathMatch: 'full',
        component: AccountsListComponent,
      },
      {
        path: 'client/:cin/account/add',
        pathMatch: 'full',
        component: AccountFormComponent,
      },
      {
        path: 'client/:cin/account/:id/update',
        pathMatch: 'full',
        component: AccountFormComponent,
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

