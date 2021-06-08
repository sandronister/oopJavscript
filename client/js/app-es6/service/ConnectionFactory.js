    var stores = ['negociacoes'];
    const db = 'sandroni';
    const version = 11;

    var connection = null;
    var close = null;

    export  class ConnectionFactory
            {
                 constructor()
                 {
                     throw new Error('Não é possível instanciar uma ConnectionFactory');
                 }

                 static getConnection()
                 {
                     return new Promise((resolve,reject)=>{

                           let openRequest = window.indexedDB.open(db,version);

                           openRequest.onupgradeneeded = e => {
                               ConnectionFactory._createStores(e.target.result);
                           }

                           openRequest.onsuccess = e => {
                               if(!connection)
                               {
                                  connection = e.target.result;
                                  close = connection.close.bind(connection);
                                  connection.close = ()=>{
                                       throw new Error('Você não pode fechar a conexão');
                                  }
                               }

                               resolve(connection);
                           }

                           openRequest.onerror = e => {
                               reject(e.target.error.name);
                           }
                     });
                 }

                 static closeConnection()
                 {
                      close();
                      connection = null;
                 }

                 static _createStores(connection)
                 {
                   console.log('aqui');

                     stores.forEach(item =>{
                          if(connection.objectStoreNames.contains(item))
                          {
                             connection.deleteObjectStore(item);
                          }
                          console.log(item);
                          connection.createObjectStore(item,{autoIncrement:true});

                     });
                 }
            }
