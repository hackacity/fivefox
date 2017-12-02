import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class APIService {

    URI_BASE = "http://127.0.0.1:5000/";

    constructor(private http : Http) { }

    getTest() : Observable<any> {

        let uri = this.URI_BASE + 'incidentes';

        return this.http
                    .get(uri)
                    .map(res => res.json())
                    .catch(error => Observable.throw(error.json().error || 'Server error'));

    }


}
