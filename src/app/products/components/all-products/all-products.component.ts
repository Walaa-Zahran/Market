import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private service: ProductsService) { }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    //we use subscribe as a pipe to  connect data from backend to frontend
    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      console.log(this.products);
    }), (error: any) => { console.log('Error', error) }


  }
}
