import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: "textoReduzido"
})
export class TextoReduzido implements PipeTransform {
    transform(value: string, tamanho: number) : String {
        if(value.length > tamanho){
            return value.substr(0,tamanho) + '...'
        }
        return value
    }
}