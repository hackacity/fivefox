import { Component, OnInit, Input } from '@angular/core';
import { APIService } from 'app/api.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as __ from 'lodash';
import { BrowserService } from 'app/browser.service';
import { config } from 'environments/config';

declare var google;

@Component({
    selector: 'app-campo-direita',
    inputs: ['datagraphic'],
    templateUrl: './campo-direita.component.html',
    styleUrls: ['./campo-direita.component.css']
})
export class CampoDireitaComponent implements OnInit, AfterViewInit {

    @Input('datagraphic') datagraphic: any;

    total: string;
    roubo: string;
    furto: string;
    outros: string;

    horas_crimes: any;

    constructor(
        private api: APIService,
        private browserService: BrowserService
    ) { }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.browserService.getLocation().subscribe(latlng => {

            let pos = {
                lat: latlng.latitude,
                lng: latlng.longitude
            };

            this.api.getBOs(pos, config.raio).subscribe(locations => {


                console.log(locations);
                this.total = locations.length;
                this.furto = locations.filter(l => l.tipo == "furto").length;
                this.roubo = locations.filter(l => l.tipo == "roubo").length;
                this.outros = (parseInt(this.total) - parseInt(this.furto) - parseInt(this.roubo)).toString();

                let horas = locations.map(o => o.hora);
                horas = __.groupBy(horas, Math.floor);

                let _horas = [];

                for (var i in horas) {
                    _horas[i] = horas[i].length;
                }

                this.horas_crimes = _horas;


                this.setGraphicBar();
            });
        });


    }

    formataNumero(n: number) {
        return n.toLocaleString('en-US');
    }

    setGraphicBar() {

        google.charts.load('current', { 'packages': ['bar'] });
        google.charts.setOnLoadCallback(() => {
            var data = new google.visualization.arrayToDataTable([
                ['Horas', 'Quantidade'],
                ['0', this.horas_crimes[0] + this.horas_crimes[1]],
                ['2', this.horas_crimes[2] + this.horas_crimes[3]],
                ['4', this.horas_crimes[4] + this.horas_crimes[5]],
                ['6', this.horas_crimes[6] + this.horas_crimes[7]],
                ['8', this.horas_crimes[8] + this.horas_crimes[9]],
                ['10', this.horas_crimes[10] + this.horas_crimes[11]],
                ['12', this.horas_crimes[12] + this.horas_crimes[13]],
                ['14', this.horas_crimes[14] + this.horas_crimes[15]],
                ['16', this.horas_crimes[16] + this.horas_crimes[17]],
                ['18', this.horas_crimes[18] + this.horas_crimes[19]],
                ['20', this.horas_crimes[20] + this.horas_crimes[21]],
                ['22', this.horas_crimes[20] + this.horas_crimes[23]],
            ]);

            var options = {
                width: 335,
                legend: { position: 'none' },
                chart: {
                    title: 'Horário de Funcionamento',
                    subtitle: 'da criminalidade'
                },
                axes: {
                    x: {
                        0: { side: 'top', label: '' } // Top x-axis.
                    }
                },
                bar: { groupWidth: "90%" }
            };

            var chart = new google.charts.Bar(document.getElementById('top_x_div'));
            // Convert the Classic options to Material options.
            chart.draw(data, google.charts.Bar.convertOptions(options));
        });
    }

}
