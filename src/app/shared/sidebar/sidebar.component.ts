import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class SidebarComponent {

    get historial() {
        return this.gifsService.historial;
    }

    constructor(
        private gifsService: GifsService
    ) { }

    buscar(termino: string) {
        console.log("[SharedModule] [SidebarComponent] [buscar()] Término: ", termino);

        this.gifsService.buscarGifs(termino);
    }
}
