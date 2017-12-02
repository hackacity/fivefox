import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

    Map : any = {};

    constructor() { }

    ngOnInit() {

        new google.maps.Map(document.getElementById('map'), {
            zoom: 4
          });
        
    }

}
