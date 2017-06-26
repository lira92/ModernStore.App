import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class CartService {
    public items:any[] = [];
    cartChange:Observable<any>;
    cartChangeObserver:Observer<any>;

    /**
     *
     */
    constructor() {
        this.cartChange = new Observable((observer: Observer<any>) => {
            this.cartChangeObserver = observer;
        })
    }


    addItem(item) {
        this.getItems();
        if (this.hasItem(item.id)) {
            this.updateQuantity(item.id, 1);
        } else {
            this.items.push(item);
        }
        localStorage.setItem('mws.cart', JSON.stringify(this.items));
        this.cartChangeObserver.next(this.items);
    }

    updateQuantity(id, quantity) {
        for (let i of this.items) {
            if (i.id == id) {
                i.quantity += +quantity;
            }
        }
        this.cartChangeObserver.next(this.items);
    }

    getItems(): any[] {
        var data = localStorage.getItem('mws.cart');
        if (data) {
            this.items = JSON.parse(data);
        }
        this.cartChangeObserver.next(this.items);
        return this.items;
    }

    hasItem(id): boolean {
        for (let i of this.items) {
            if (i.id == id) {
                return true;
            }
        }
        this.cartChangeObserver.next(this.items);
        return false;
    }

    removeItem(id: string) {
        for(var item of this.items) {
            if(item.id == id) {
                var index = this.items.indexOf(item);
                this.items.splice(index, 1);
            }
        }

        this.save();

        this.cartChangeObserver.next(this.items);
    }

    save() {
        localStorage.setItem('mws.cart', JSON.stringify(this.items));
    }

    load() {
        var data = localStorage.getItem('mws.cart');
        if(data) {
            this.items = JSON.parse(data);
        }
        this.cartChangeObserver.next(this.items);
    }

    clear() {
        this.items = [];
        this.removeItem('mws.cart');
        this.cartChangeObserver.next(this.items);
    }

    getSubTotal(): number {
        var result: number = 0;
        for (let i of this.items) {
            result += +(+i.price * +i.quantity);
        }
        this.cartChangeObserver.next(this.items);
        return result;
    }
}