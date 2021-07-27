import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
	{
		path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
	{
		path: 'home',
        component: AuthLayoutComponent,
        children: [{
			path: '',
                loadChildren: './home/home.module#HomeModule'
            }
		]
    }
];
