import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../pedidos.service';
import { Pedido } from '../shared/pedido.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [PedidoService]
})
export class OrdemCompraComponent implements OnInit {

  //@ViewChild('formulario') public formulario: NgForm

  public pedido: Pedido

  constructor(private service: PedidoService) { }

  ngOnInit() {
  }
  // confirmarCompra(): void {
  //   this.pedido = new Pedido(
  //     this.formulario.value.endereco,
  //     this.formulario.value.numero,
  //     this.formulario.value.complemento,
  //     this.formulario.value.formaPagamento
  //   )
  //   this.service.inserirPedido(this.pedido).subscribe((x : number)=> {
  //     this.pedido.id = x;
  //   })
  // }

}
