import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service'
import { CarrinhoService } from '../carrinho.service'
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService, CarrinhoService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private service: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    console.log('Oferta', this.carrinhoService.exibirItens());

    this.route.params.subscribe((parametros: Params) => {
      this.service.getOfertasPorId(parametros.id)
        .then((x: Oferta) => this.oferta = x);
    })
  }

  public AddOferta(): void {
    this.carrinhoService.incluirItem(this.oferta);
  }

}
