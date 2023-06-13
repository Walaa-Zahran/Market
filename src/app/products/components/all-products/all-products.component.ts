import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products: any[] = [];
  @Output() categories: any[] = [];
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
      this.products = res; this.loading = false;

      console.log('products', this.products);
    }), (error: any) => { alert('Error' + error) }


  }
  getCategories() {
    //we use subscribe as a pipe to  connect data from backend to frontend
    this.loading = true;
    this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res; this.loading = false;

      console.log('categories', this.categories);
    }), (error: any) => { alert('Error' + error) }


  }

  getProductsByCategory(keyword: string) {
    this.loading = true;
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res;
      this.loading = false;
    }), (error: any) => { alert('Error' + error) }
  }
}
