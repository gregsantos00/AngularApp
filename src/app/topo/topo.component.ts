import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';

import '../shared/rxjs-extensions'


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  private ofertas: Observable<Oferta[]>
  private subs: Subject<string> = new Subject<string>()
  //  public listaOfertas : Oferta[];


  constructor(private servico: OfertasService) { }


  ngOnInit() {
    this.ofertas = this.subs
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((valor: string) => {
        if (valor.trim() === '') {
          return Observable.of<Oferta[]>([]);
        }
        console.log('Requisição')
        return this.servico.pesquisarOferta(valor)
      })
      .catch((error: any) => {
        console.log(error)
        return Observable.of<Oferta[]>([]);
      })

    //  this.ofertas.subscribe((ofertas: Oferta[]) => this.listaOfertas = ofertas)
  }

  // Pesquisar(valor: string): void {

  //   this.ofertas = this.servico.pesquisarOferta(valor);

  //   this.ofertas.subscribe(
  //     ((x: Oferta[]) => console.log(x)),
  //     ((erro: any) => console.log(erro)),
  //     () => console.log('Completo')
  //   );

  // }

  PesquisarSubject(valor: string): void {
    this.subs.next(valor)
  }
  LimparPesquisa(): void {
    this.subs.next('');
  }

}
