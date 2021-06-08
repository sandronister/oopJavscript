export class NegociacaoDAO
{

    constructor(connection)
    {
         this._connection = connection;
         this._store = 'negociacoes';
    }

    add(negociacao)
    {
         return new Promise((resolve,reject)=>{
              let request = this._connection
                            .transaction([this._store],'readwrite')
                            .objectStore(this._store)
                            .add(negociacao);

              request.onsuccess = e => resolve();
              request.onerror = e => {
                  reject(e.target.error.name)
              };
         });
    }

    listAll()
    {
        return new Promise((resolve,reject)=>{

               let negociacoes = [];

               let cursor = this._connection
                             .transaction([this._store],'readwrite')
                             .objectStore(this._store)
                             .openCursor();

              cursor.onsuccess = e =>{

                  let atual = e.target.result;

                  if(atual)
                  {
                      let dado = atual.value;
                      negociacoes.push(new Negociacao(dado._data,dado._quantidade,dado._valor));
                      atual.continue();
                  }
                  else
                  {
                    resolve(negociacoes);
                  }
              }

              cursor.onerror = e => reject('Não foi possivel carregar as negociacões');
        });
    }

    clear()
    {
        return new Promise((resolve,reject)=>{
            let cursor =   this._connection
                               .transaction([this._store],'readwrite')
                               .objectStore(this._store)
                              .clear();

            cursor.onsuccess = e => resolve('Negociações apagadas com sucesso');

            cursor.onerror = e=> reject('Ocorreu um erro ao apagar as negociações');
        });
    }
}
