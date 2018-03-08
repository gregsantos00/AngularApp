import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public descricao: string;

  constructor(private rota: ActivatedRoute, private service: OfertasService) { }

  ngOnInit() {

    this.rota.parent.params.subscribe((parametros: Params) => {
      this.service.getComoUsarByOferta(parametros.id)
        .then((x: string) => this.descricao = x);
    })
  }

}
