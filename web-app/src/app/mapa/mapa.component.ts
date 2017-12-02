import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

    map: any = {};

    constructor() { }

    ngOnInit() {

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: {lat: -16, lng: -68}
        });

    }

}
