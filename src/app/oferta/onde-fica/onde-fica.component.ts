import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public descricao: string;

  constructor(private rota: ActivatedRoute, private service: OfertasService) { }

  ngOnInit() {

    this.rota.parent.params.subscribe((parametros: Params) => {
      this.service.getOndeFicaByOferta(parametros.id)
        .then((x: string) => this.descricao = x);
    })
  }

}
