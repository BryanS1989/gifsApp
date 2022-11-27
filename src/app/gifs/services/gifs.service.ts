import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchGifsResponse } from '../Interface/gifs.interface';

@Injectable({
    providedIn: 'root' /*   ProvideIn:'root' indica que...
                                El servicio será definido en el momento que se construya el bundle de la aplicación,
                                el servicio será único y de manera global en la aplicación.
                                El servicio será Global para toda la aplicación
                        */
})
export class GifsService {

    private apiKey: string = 'a7Qs9SjSPrDATTFxDfrNGjKmoG9VA6Zg';
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
    private _historial: string[] = [];

    public resultados: Gif[] = [];

    get historial() {
        // Con ... (operador spread) rompemos la referencia a _historial, de esta manera no modificarán
        //  nunca _historial directamente. Retornaremos el valor y no la referencia, en JS todos los objetos
        //  se pasan como referencia
        return [...this._historial];
    }

    // Obtener los gifs usando HttpClientModule
    constructor(
        private http: HttpClient
    ) {
        /*
        if (localStorage.getItem('historial')) {
            this._historial = JSON.parse(localStorage.getItem('historial')!);
        }
        */
        this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

        // Get last search results
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }

    buscarGifs(query: string = '') {

        query = query.trim().toLocaleLowerCase();

        // Do not allow duplicates
        if (!this._historial.includes(query)) {
            this._historial.unshift(query);

            // Do not allow to storage more than 10 items
            this._historial = this._historial.splice(0, 10);

            localStorage.setItem('historial', JSON.stringify(this._historial));
        }

        console.log('[GifsService] [buscarGifs()] Current historial: ', this._historial);

        const params = new HttpParams()
            .set("api_key", this.apiKey)
            .set("limit", "10")
            .set("q", query);

        console.log('[GifsService] [buscarGifs()] Params: ', params);

        // Obtener los gifs usando HttpClientModule
        this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
            .subscribe((response) => {
                console.log(`[GifsService][buscarGifs()] Enpoint SEARCH "${query}" response: `, response.data);
                this.resultados = response.data;

                // Save las search at localStorage
                localStorage.setItem('resultados', JSON.stringify(this.resultados));
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
