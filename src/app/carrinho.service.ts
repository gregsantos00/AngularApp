import { ItemCarrinho } from './shared/item-carrinho.model'
import { Oferta } from './shared/oferta.model';


export class CarrinhoService {
    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }
    public incluirItem(oferta: Oferta) {
        let item: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        let itemExistente = this.itens.find((x: ItemCarrinho) => x.id === item.id);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            this.itens.push(item);
        }
        console.log('Item adiciondo', this.itens)
    }

    public totalCarrinho(): number {

        let total = 0;
        this.itens.map((x: ItemCarrinho) => total += (x.valor * x.quantidade))
        return total;
    }

    public addItem(item: ItemCarrinho): void {
        let itemExistente = this.itens.find((x: ItemCarrinho) => x.id === item.id);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        }
    }
    public removeItem(item: ItemCarrinho): ItemCarrinho[] {
        let itemExistente = this.itens.find((x: ItemCarrinho) => x.id === item.id);

        if (itemExistente) {
            itemExistente.quantidade -= 1;
            if(itemExistente.quantidade === 0){
               this.itens =  this.itens.filter((x: ItemCarrinho)=> x.id != itemExistente.id);
            }
        }
        return this.itens;
    }


}