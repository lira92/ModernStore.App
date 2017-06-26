import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
    private serviceUrl: string = 'http://www.mocky.io/';

    constructor(private http: Http) {
        
    }

    createUser(data: any) {
        return this.http.post(this.serviceUrl + 'v1/customers', data).map((response:Response) => response.json());
    }

    authenticate(data: any) {
        var dt = "grant_type=password&username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.serviceUrl + 'v1/authenticate', dt, options).map((response:Response) => response.json());
    }

    getProducts() {
        return this.http.get(this.serviceUrl + 'v2/59506124120000680c8c78d8').map((response:Response) => response.json());
    }

    createOrder(data: any) {
        var token = localStorage.getItem('mws.token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`);
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.serviceUrl + 'v1/orders', data, options).map((response:Response) => response.json());
    }

}