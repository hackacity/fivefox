import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { APIService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    title = 'Hack a City';

    constructor(private service : APIService) {}

    ngAfterViewInit() {

        this.service.getTest().subscribe(text => console.log(text), err => console.error(err));

    }


}
