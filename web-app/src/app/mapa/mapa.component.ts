import { BrowserService } from './../browser.service';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'app/api.service';

declare var google;
declare var MarkerClusterer;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

    map: any = {};

    constructor(
        private browserService: BrowserService,
        private api: APIService
    ) { }

    ngOnInit() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: -28.024, lng: 140.887 },
            disableDefaultUI: true
        });

        this.setLocationOnMap();

        
        this.api.getIncidentes().subscribe(locations => this.setIncidentesOnMap(locations.incidentes));

        this.map.addListener('click', function(e) {

            let marker = new google.maps.Marker({
                position: e.latLng,
                map: this.map
            });
            
            this.map.setCenter(marker.getPosition());
          });

    }

    setLocationOnMap() {

        this.browserService.getLocation().subscribe(latlng => {

            let pos = {
                lat: latlng.latitude,
                lng: latlng.longitude
            };

            this.map.setCenter(pos);
        });

    }

    setIncidentesOnMap(locations) {

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        var markers = locations.map(function (location, i) {
            return new google.maps.Marker({
                position: {
                    lat: location.latitude,
                    lng: location.longitude
                },
                label: labels[i % labels.length]
            });
        });

        var markerCluster = new MarkerClusterer(this.map, markers,
            { imagePath: 'http://localhost:4200/assets/images/m' });


    }

}
