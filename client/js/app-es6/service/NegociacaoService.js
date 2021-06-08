import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {Negociacao} from '../model/Negociacao';
import {NegociacaoDAO} from '../dao/NegociacaoDAO';

export class NegociacaoService
{
      constructor()
      {
          this._http = new HttpService();
          this._urlSemana          = 'negociacoes/semana';
          this._urlSemanaAnterior  = 'negociacoes/anterior';
          this._urlSemanaRetrasada = 'negociacoes/retrasada';
      }

      obterNegociacoes()
      {
          return  Promise.all([
                     this.obterNegociacoesSemana(),
                     this.obterNegociacoesSemanaAnterior(),
                     this.obterNegociacoesSemanaRetrasada()
                  ])
                  .then(periodos=>{
                     return periodos.reduce((flat,item)=>flat.concat(item),[])
                  })
                  .catch(error=>{
                     throw new Error(error)
                   });
      }

      obterNegociacoesSemana()
      {
          return this._http
                       .get(this._urlSemana)
                       .then(lista=>lista.map(obj=>new Negociacao(new Date(obj.data),obj.quantidade,obj.valor)))
                       .catch(error=> {throw new Error("Não foi possível obter as negociações da semana")});
      }

      obterNegociacoesSemanaAnterior()
      {
          return this._http
                     .get(this._urlSemanaAnterior)
                     .then(lista=>lista.map(obj=>new Negociacao(new Date(obj.data),obj.quantidade,obj.valor)))
                     .catch(error=> {throw new Error("Não foi possível obter as negociações da semana anterior")});
      }

      obterNegociacoesSemanaRetrasada()
      {
          return this._http
                       .get(this._urlSemanaRetrasada)
                       .then(lista=>lista.map(obj=>new Negociacao(new Date(obj.data),obj.quantidade,obj.valor)))
                       .catch(error=> {throw new Error("Não foi possível obter as negociações da semana retrasada")});
      }

      listaAll()
      {
          return ConnectionFactory.getConnection()
                           .then(connection=>new NegociacaoDAO(connection))
                           .then(dao=> dao.listAll())
                           .catch(error=>{throw new Error(error)});
      }

      add(negociacao)
      {
         return ConnectionFactory.getConnection()
                          .then(connection => new NegociacaoDAO(connection))
                          .then(dao => dao.add(negociacao))
                          .then(()=>'Negociação adicionada com sucesso')
                          .catch(error=>{throw new Error('Não foi possível adicionar a negociação')});
      }

      clear()
      {
           return ConnectionFactory.getConnection()
                         .then(connection => new NegociacaoDAO(connection))
                         .then(dao=> dao.clear())
                         .then(()=> 'Negociações apagadas com sucesso')
                         .catch(error=>{throw new Error('Não foi possível remover as negociações')});
      }

      import(listaAtual)
      {
        return this.obterNegociacoes()
               .then(negociacoes =>negociacoes.filter(negociacao =>
                        !listaAtual.some(item =>JSON.stringify(negociacao) == JSON.stringify(item))
                      )
                )
               .catch(error=>{throw new Error(error)});
      }
}
