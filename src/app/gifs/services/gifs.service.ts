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

    buscarGifs(query: string = '') {

        query = query.trim().toLocaleLowerCase();

        // Do not allow duplicates
        if (!this._historial.includes(query)) {
            this._historial.unshift(query);

            // Do not allow to storage more than 10 items
            this._historial = this._historial.splice(0, 10);
        }

        console.log('[GifsService] [buscarGifs()] Current historial: ', this._historial);
    }
}
