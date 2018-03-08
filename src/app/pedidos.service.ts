import {Pedido} from './shared/pedido.model'
import {Injectable} from '@angular/core';
import { Http, RequestOptions, Headers,Response } from '@angular/http';
import {URL_API_PEDIDO} from './app.constantes'
import { Observable } from 'rxjs/Observable';
import './shared/rxjs-extensions'


@Injectable()
export class PedidoService {
    constructor(private request :Http){
        
    }
    public inserirPedido(pedido : Pedido) : Observable<any>{
        
        let headers: Headers = new Headers();

        headers.append('Content-type','application/json');
        
        return this.request.post(
            URL_API_PEDIDO,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers})
        )
        .retry(3)
        .map((x: Response)=> x.json().id);

    }

}