import {Routes} from '@angular/router';
import {ProductsPanelComponent} from '../components/admin/products-panel/products-panel.component';

export const adminRoutes: Routes = [
  {
    path: "products",
    component: ProductsPanelComponent,
    outlet: "admin"
  }
] as Routes;
