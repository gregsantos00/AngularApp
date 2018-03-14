import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../pedidos.service';
import { CarrinhoService } from '../carrinho.service'
import { Pedido } from '../shared/pedido.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [PedidoService]
})
export class OrdemCompraComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(12)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl("", [Validators.required]),
  })

  public pedido: Pedido
  public itensCarrinho: ItemCarrinho[] = []

  constructor(
    private service: PedidoService,
    public carinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carinhoService.exibirItens();
  }
  confirmarCompra(): void {
    if (!this.formulario.valid) {
      this.formulario.get('endereco').markAsTouched();
      this.formulario.get('numero').markAsTouched();
      this.formulario.get('complemento').markAsTouched();
      this.formulario.get('formaPagamento').markAsTouched();
      return
    }
    this.pedido = new Pedido(
      this.formulario.value.endereco,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.formaPagamento
    )
    this.service.inserirPedido(this.pedido).subscribe((x: number) => {
      this.pedido.id = x;
    })
  }
  public removeItem(item: ItemCarrinho): void {

    this.itensCarrinho = this.carinhoService.removeItem(item);
  }

}
