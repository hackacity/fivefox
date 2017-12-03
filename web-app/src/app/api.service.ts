import { error } from 'util';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class APIService {

    URI_BASE = "http://172.50.5.140:5000/";
    //URI_BASE = "http://127.0.0.1:5000/";


    constructor(private http: Http) { }

    getIncidentes(): Observable<any> {

        let uri = this.URI_BASE + 'info';

        return this.http
            .get(uri)
            .map(res => res.json())
            .catch(error => Observable.throw(error.json().error || 'Server error'));

    }

    getInfo() : Observable<any> {
        let uri = this.URI_BASE + 'info/total';

        return this.http
                .get(uri)
                .map(res => res.json())
                .catch(erro => Observable.throw(erro.json().error || 'Server error'))
    }

    getBOs(position, raio): Observable<any> {
        let uri = this.URI_BASE + 'bo?lat='+ position.lat +'&long='+ position.lng +'&raio=' + raio

        return this.http.get(uri)
        .map(res=> res.json())
        .catch(error => Observable.throw(error.json().error || 'Server error.'))
    }

}
