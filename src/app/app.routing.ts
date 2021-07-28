import { Routes } from '@angular/router';



export const AppRoutes: Routes = [
	{
		path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
	{
		path: 'home',
        children: [{
			path: '',
                loadChildren: './home/home.module#HomeModule'
            }
		]
    }
];
