import {Routes} from '@angular/router';
import {adminRoutes} from './routes/admin.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "",
    loadChildren: () => import('./routes/home.routes').then(value => value.HomeRoutes)
  },
  {
    path: "panel",
    loadComponent: () => import('./components/admin/panel/panel.component').then(value => value.PanelComponent),
    children: adminRoutes
  }
];
