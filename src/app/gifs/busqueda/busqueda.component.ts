import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

    // ! --> NonNullAssertion operator : Operador para asegurarnos de que
    // el objeto no será nulo https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

    constructor(
        private gifsService: GifsService
    ) {

    }
    buscar() {
        const valor = this.txtBuscar.nativeElement.value;
        console.log("[GifsModule] [BusquedaComponent] [buscar()] Buscar: ", valor);

        this.txtBuscar.nativeElement.value = '';

        this.gifsService.buscarGifs(valor);
    }

}
