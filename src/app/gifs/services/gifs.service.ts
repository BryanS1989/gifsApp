import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root' /*   ProvideIn:'root' indica que...
                                El servicio será definido en el momento que se construya el bundle de la aplicación,
                                el servicio será único y de manera global en la aplicación.
                                El servicio será Global para toda la aplicación
                        */
})
export class GifsService {

    private apiKey: string = 'a7Qs9SjSPrDATTFxDfrNGjKmoG9VA6Zg';
    private _historial: string[] = [];

    public resultados: any[] = [];

    get historial() {
        // Con ... (operador spread) rompemos la referencia a _historial, de esta manera no modificarán
        //  nunca _historial directamente. Retornaremos el valor y no la referencia, en JS todos los objetos
        //  se pasan como referencia
        return [...this._historial];
    }

    // Obtener los gifs usando HttpClientModule
    constructor(
        private http: HttpClient
    ) { }

    buscarGifs(query: string = '') {

        query = query.trim().toLocaleLowerCase();

        // Do not allow duplicates
        if (!this._historial.includes(query)) {
            this._historial.unshift(query);

            // Do not allow to storage more than 10 items
            this._historial = this._historial.splice(0, 10);
        }

        console.log('[GifsService] [buscarGifs()] Current historial: ', this._historial);

        // Obtener los gifs usando HttpClientModule
        this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&limit=10&api_key=a7Qs9SjSPrDATTFxDfrNGjKmoG9VA6Zg`)
            .subscribe((response: any) => {
                console.log(`[GifsService][buscarGifs()] Enpoint SEARCH "${query}" response: `, response.data);
                this.resultados = response.data;
            });

        /*
        Ejemplo con Fetch
        -----------------

        fetch('https://api.giphy.com/v1/gifs/search?q=Dragon%20Ball%20Z&limit=10&api_key=a7Qs9SjSPrDATTFxDfrNGjKmoG9VA6Zg')
            .then((resp) => {
                resp.json().then((data) => {
                    console.log(data);
                });
            })
        */

        /*
        Ejemplo Fetch + ASYNC / AWAIT
        -----------------------------

        async buscarGifs(query: string = '') {
        [ ... ]
        const respuesta = await fetch('https://api.giphy.com/v1/gifs/search?q=Dragon%20Ball%20Z&limit=10&api_key=a7Qs9SjSPrDATTFxDfrNGjKmoG9VA6Zg');
        const data = await respuesta.json();
        console.log(data);
        */

    }


}
