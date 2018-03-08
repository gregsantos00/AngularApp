import { Oferta } from './shared/oferta.model';
import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {URL_API_OFERTA} from './app.constantes'
import {URL_API_COMO} from './app.constantes'
import {URL_API_ONDE} from './app.constantes'
import { Observable } from 'rxjs/Observable';
import './shared/rxjs-extensions'

@Injectable()
export class OfertasService {

    constructor(private request :Http){
        
    }
    public getOfertasApi(): Promise<Array<Oferta>> {
        return this.request.get(`${URL_API_OFERTA}?destaque=true`)
        .toPromise()
        .then((x: any) => x.json());
    }
    public getOfertasPorcategoria(categoria : string): Promise<Array<Oferta>> {
        return this.request.get(`${URL_API_OFERTA}?categoria=${categoria}`)
        .toPromise()
        .then((x: any) => x.json());
    }
    public getOfertasPorId(id : number): Promise<Oferta> {
        return this.request.get(`${URL_API_OFERTA}?id=${id}`)
        .toPromise()
        .then((x: any) => x.json()[0]);
    }
    public getComoUsarByOferta(id: number) : Promise<string>{
        return this.request.get(`${URL_API_COMO}?id=${id}`)
        .toPromise()
        .then((x: any) => x.json()[0].descricao);
    }
    public getOndeFicaByOferta(id: number) : Promise<string>{
        return this.request.get(`${URL_API_ONDE}?id=${id}`)
        .toPromise()
        .then((x: any) => x.json()[0].descricao);
    }
    public pesquisarOferta(termo : string) : Observable<Oferta[]>{
        return this.request.get(`${URL_API_OFERTA}?descricao_oferta_like=${termo}`)
        .retry(10)
        .map((x: any)=> x.json());

    }
}