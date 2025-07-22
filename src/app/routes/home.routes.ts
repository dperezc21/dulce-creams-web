import {Routes} from '@angular/router';
import {OrdersComponent} from '../components/orders/orders.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: OrdersComponent
  }
] as Routes;
