import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' /*   ProvideIn:'root' indica que...
                                El servicio será definido en el momento que se construya el bundle de la aplicación,
                                el servicio será único y de manera global en la aplicación.
                                El servicio será Global para toda la aplicación
                        */
})
export class GifsService {

    private _historial: string[] = [];

    get historial() {
        // Con ... (operador spread) rompemos la referencia a _historial, de esta manera no modificarán
        //  nunca _historial directamente. Retornaremos el valor y no la referencia, en JS todos los objetos
        //  se pasan como referencia
        return [...this._historial];
    }

    buscarGifs(query: string) {
        this._historial.unshift(query);

        console.log('[GifsService] [buscarGifs()] Current historial: ', this._historial);
    }
}
