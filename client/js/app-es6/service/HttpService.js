export class HttpService
{
     _handlerError(resp)
     {
         if(!resp.ok) throw new Error(resp.statusText);
         return resp;
     }

     get(url)
     {
        return fetch(url)
                .then(resp=> this._handlerError(resp))
                .then(resp=> resp.json());
     }

     post(url, dado)
     {
         return fetch(url,{
                 headers:{'Content-type':'application/json'},
                 method:'post',
                 body:JSON.stringify(dado)
         })
         .then(resp=>this._handlerError(resp));
     }
}
