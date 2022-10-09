import { Injectable } from '@angular/core';
import { BackendService } from "../../../../core/backend/backend.service";
import { Observable } from "rxjs";
import { Order } from "../../models/order.model";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderURL = 'http://localhost:8080/order'

  constructor(private backendService: BackendService) {
  }

  submit(order: Order): Observable<any> {
    return this.backendService.post(this.orderURL, order)
  }


}
