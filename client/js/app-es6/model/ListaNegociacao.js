export class ListaNegociacao
{
     constructor()
     {
         this._listaNegociacao = [];
     }

     add(negociacao)
     {
       this._listaNegociacao.push(negociacao);
     }

     get negociacoes()
     {
         return [].concat(this._listaNegociacao);
     }

     ordena(coluna)
     {
        this._listaNegociacao.sort((a,b)=>a[coluna]-b[coluna]);
     }

     inverte()
     {
        this._listaNegociacao.reverse();
     }

     clean()
     {
         this._listaNegociacao.length = 0;
     }
}
