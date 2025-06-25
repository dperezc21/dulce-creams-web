import {Routes} from '@angular/router';
import {adminRoutes} from './routes/admin.routes';
import {OrdersComponent} from './components/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: OrdersComponent
  },
  {
    path: "panel",
    loadComponent: () => import('./components/admin/panel/panel.component').then(value => value.PanelComponent),
    children: adminRoutes
  }
];
