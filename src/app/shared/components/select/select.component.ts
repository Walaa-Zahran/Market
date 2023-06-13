import { Component, Input } from '@angular/core';
import { AllProductsComponent } from 'src/app/products/components/all-products/all-products.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  title: any = 'Categories :';
  constructor(private allProducts: AllProductsComponent) { }
  filterCategory(event: any) {
    let value = event.target.value;
    if (value == 'All') {
      this.allProducts.getProducts();
    }
    else {
      this.allProducts.getProductsByCategory(value);
    }
    console.log(value);
  }
}
