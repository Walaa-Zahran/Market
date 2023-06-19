import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  success: boolean = false;
  constructor(private service: CartsService) { }
  ngOnInit(): void {
    this.getCartProducts();
  }
  cartProducts: any[] = [];
  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    console.log(this.cartProducts);
    this.getCartTotal();
  }
  total: any = 0;
  detectChange() {
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  clearCart() {
    this.cartProducts = [];
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }
  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    this.getCartTotal();

  }
  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  minusAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }
  addCart() {
    let products = this.cartProducts.map(item => {
      return {
        productId: item.item.id,
        quantity: item.quantity
      }
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }
    this.service.createNewCart(Model).subscribe(res => {
      this.success = true;
      console.log(res);
    })
    console.log("model", Model);
  }
}
