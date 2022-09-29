import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "./order.model";
//import { StaticDataSource } from "./static.datasource";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class OrderRepository {
    
    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders().subscribe(o => {
            this.orders = o;
        });
    }

    getOrders(): Order[] {
        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }

    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

    updateOrder(order: Order) {
        this.dataSource.updateOrder(order).subscribe(o => {
            this.orders.splice(this.orders.findIndex(o => o.id = order.id), 1, order);
        })
    }

    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id).subscribe(o => {
            this.orders.splice(this.orders.findIndex(o => o.id == id), 1);
        })
    }
}