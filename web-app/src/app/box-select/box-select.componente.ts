import { BrowserService } from './../browser.service';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'app/api.service';

declare var google;
declare var MarkerClusterer;

@Component({
    selector: 'app-box-select',
    templateUrl: './box-select.componente.html',
    styleUrls: ['./box-select.componente.css']
})
export class BoxSelectComponente implements OnInit {
    total: string;
    roubo: string;
    furto: string;

    constructor(
        private api: APIService
    ) { }

    ngOnInit() {
        
             
        
    }
}