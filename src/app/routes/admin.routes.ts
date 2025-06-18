import {Routes} from '@angular/router';
import {ProductsPanelComponent} from '../components/admin/products-panel/products-panel.component';
import {AddProductComponent} from '../components/admin/add-product/add-product.component';

export const adminRoutes: Routes = [
  {
    path: "products",
    component: ProductsPanelComponent,
    outlet: "admin"
  }
] as Routes;
