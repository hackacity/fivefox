import { BrowserService } from './../browser.service';
import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

    map: any = {};

    constructor(private browserService: BrowserService) { }

    ngOnInit() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: {lat: -16, lng: -68}
        });

        this.browserService.getLocation().subscribe(latlng => {

            let pos = {
                lat: latlng.latitude,
                lng: latlng.longitude
            };

            this.map.setCenter(pos);
        });        

    }

}
