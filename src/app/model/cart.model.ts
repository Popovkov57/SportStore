import { Injectable } from "@angular/core";
import { Product } from "./product.model";

@Injectable()
export class Cart {

    public lines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    addLine(product: Product, quantity: number) {
        let line = this.lines.find(line => line.product.id == product.id);
        if (line != undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculate();
    }

    updateQuantity(product: Product, quantity: number) {
        let line = this.lines.find(line => line.product.id == product.id);
        if (line != undefined) {
            line.quantity = quantity;
        }
        this.recalculate();
    }

    removeLine(id: number) {
        console.log("removeLine");
        console.log("id: " + id);
        let index = this.lines.findIndex(line => line.product.id == id);
        console.log("index: " + index)
        console.log(this.lines);
        this.lines.splice(index, 1);
        console.log(this.lines);
        this.recalculate();
    }

    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(line => {
            this.itemCount += line.quantity;
            this.cartPrice += (line.quantity * line.product.price)
        })
    }

}

export class CartLine {
    constructor(public product: Product, public quantity: number) {}

    get lineTotal() {
        return this.quantity * this.product.price;
    }
}