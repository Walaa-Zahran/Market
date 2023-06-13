import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: any[] = [];
  categories: any[] = [];
  loading: boolean = false;
  constructor(private service: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    //we use subscribe as a pipe to  connect data from backend to frontend
    this.loading = true;
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false;
      console.log('products', this.products);
    })


  }
  getCategories() {
    //we use subscribe as a pipe to  connect data from backend to frontend
    this.loading = true;
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false;

      console.log('categories', res);
    })


  }


  filterCategory(event: any) {
    let value = event.target.value;

    if (value == 'All') {
      this.getProducts();
    }
    else {
      this.getProductsCategory(value);
    }
    console.log(value);
  }
  getProductsCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.loading = false;
      this.products = res;
    })
  }
}
