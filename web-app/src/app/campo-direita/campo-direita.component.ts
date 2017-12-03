import { Component, OnInit } from '@angular/core';
import { APIService } from 'app/api.service';

@Component({
    selector: 'app-campo-direita',
    templateUrl: './campo-direita.component.html',
    styleUrls: ['./campo-direita.component.css']
})
export class CampoDireitaComponent implements OnInit {

    total: string;
    roubo: string;
    furto: string;

    constructor(
        private api: APIService
    ) { }

    ngOnInit() {

        this.api.getInfo().subscribe(info => {
            this.total = this.formataNumero(info.total);
            this.roubo = this.formataNumero(info.incidentes[0].roubo);
            this.furto = this.formataNumero(info.incidentes[1].furto);
        });

    }

    formataNumero(n : number) {
        return n.toLocaleString('en-US');
    }

}
