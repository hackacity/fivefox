import { BrowserService } from './../browser.service';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'app/api.service';
import * as __ from 'lodash';

declare var google;
declare var MarkerClusterer;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

    map: any = {};

    originais: any[];
    noMapa: any[];
    markerCluster: any = {};

    constructor(
        private browserService: BrowserService,
        private api: APIService
    ) {
        this.noMapa = [];
        this.originais = [];
        this.map = {};
        this.markerCluster = {};
    }

    ngOnInit() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: { lat: -28.024, lng: 140.887 },
            disableDefaultUI: true
        });

        this.setLocationOnMap();

        // this.map.addListener('click', (e) => {

        //     this.clearOverlays();



        //     let marker = new google.maps.Marker({
        //         position: e.latLng,
        //         map: this.map
        //     });

        //     this.map.setCenter(marker.getPosition());
        // });


    }

    setLocationOnMap() {

        this.browserService.getLocation().subscribe(latlng => {

            let pos = {
                lat: latlng.latitude,
                lng: latlng.longitude
            };

            this.map.setCenter(pos);

            // get and set markers

            this.api.getBOs(pos, 3).subscribe(locations => {
                this.originais = locations;
                this.setIncidentesOnMap(locations);


                // minerando

                let horas = this.originais.map(o => o.hora);
                horas = __.groupBy(horas, Math.floor);

                let _horas = [];

                for(var i in horas) {
                    _horas[i] = horas[i].length;
                }

                console.log(_horas);
            });
        });

    }

    setIncidentesOnMap(locations) {
        console.log(locations);

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var markers = [];
        this.noMapa = [];
        console.log('nMapa', this.noMapa);
        for (var i = 0; i < locations.length; i++) {
            let mark = new google.maps.Marker({
                position: {
                    lat: locations[i].latitude,
                    lng: locations[i].longitude
                },
                label: labels[i % labels.length]
            });
            markers.push(mark);

            this.noMapa.push(mark);
        }

        this.markerCluster = new MarkerClusterer(this.map, this.noMapa,
            { imagePath: 'http://localhost:4200/assets/images/m' });


    }

    clearOverlays() {


        for (var i = 0; i < this.noMapa.length; i++) {

            this.noMapa[i].setMap(null);
            this.noMapa[i].setVisible(false);
            console.log('mapa ', this.noMapa[i])
        }
        this.noMapa = [];

        this.markerCluster.setMap(null);

    }

}
