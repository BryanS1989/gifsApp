import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

    // ! --> NonNullAssertion operator : Operador para asegurarnos de que
    // el objeto no será nulo https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

    buscar() {
        const valor = this.txtBuscar.nativeElement.value;
        console.log("[GifsModule] [BusquedaComponent] [buscar()] Buscar: ", valor);

        this.txtBuscar.nativeElement.value = '';
    }

}
