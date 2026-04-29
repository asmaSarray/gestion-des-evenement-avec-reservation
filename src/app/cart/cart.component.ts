import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems = [
    {
      name: 'Concert Rock',
      date: new Date(2024, 8, 15),
      price: 35.0,
      imageUrl: 'assets/images/concert.jpg',
    },
    {
      name: 'Conférence Tech',
      date: new Date(2024, 9, 22),
      price: 50.0,
      imageUrl: 'assets/images/conference.jpg',
    },
  ];

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  checkout() {
    alert('Commande passée avec succès !');
    this.cartItems = [];
  }
}
