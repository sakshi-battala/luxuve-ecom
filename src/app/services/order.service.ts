import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: Firestore) {}

  // CREATE ORDER
  placeOrder(orderData: any) {
    const orderRef = collection(this.firestore, 'orders');

    return addDoc(orderRef, orderData);
  }

  // GET USER ORDERS
  getOrdersByUser(userId: string) {
    const orderRef = collection(this.firestore, 'orders');

    const q = query(orderRef, where('userId', '==', userId));

    return collectionData(q, {
      idField: 'id',
    });
  }
}
