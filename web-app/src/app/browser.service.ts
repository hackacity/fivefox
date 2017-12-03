import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BrowserService {

    private geoLocationAvaible;

    constructor() {
        this.geoLocationAvaible = Observable.create(navigator.geolocation);
    }

    isGeoLocationAvaible() : Observable<boolean> {
        return this.geoLocationAvaible();
    }

    getLocation() : Observable<any> {

        let sub = new Subject<any>();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                sub.next({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                return sub.asObservable();
            });
        }

        return sub.asObservable();

    }

}
