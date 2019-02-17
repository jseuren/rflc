import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { ISlide } from 'src/app/models/slide';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SlidesResolve implements Resolve<Array<ISlide>> {

    constructor(private _http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<ISlide>> {
        return this._http.get<Array<ISlide>>('./assets/sampleSlides.json').toPromise().then(slides => {
            if (slides) {
                return slides;
            } 
        });
    }
}