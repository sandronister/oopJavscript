import {Bind} from '../helper/Bind';
import {DateHelper} from '../helper/DateHelper';

import {NegociacaoService} from '../service/NegociacaoService';

import {ListaNegociacao} from '../model/ListaNegociacao';
import {Negociacao} from '../model/Negociacao';
import {Mensagem} from '../model/Mensagem';

import {NegociacaoView} from '../view/NegociacaoView';
import {MensagemView} from '../view/MensagemView';

export class NegociacaoController
      {
            _init()
            {
                this._service.listaAll()
                             .then(list => list.forEach(item=>this._lista.add(item)))
                             .catch(error=>this._mensagem.texto=error)

                setInterval(()=>this.importa(),3000);
            }

            constructor()
            {
               let $ = document.querySelector.bind(document);

               this._inputData   = $("#data");
               this._inputValor  = $("#valor");
               this._inputQtd    = $("#quantidade");
               this._ordemAtual  = '';

               this._lista    = new Bind(new ListaNegociacao(),new NegociacaoView($("#listaNegociacao")),'add','clean','ordena','inverte');
               this._mensagem = new Bind(new Mensagem(),new MensagemView($("#mensagem")),'texto');
               this._service  = new NegociacaoService();

               this._init();
            }

           adiciona(event)
           {
               event.preventDefault();
               let negociacao = this._criaNegociacao();

               this._service.add(negociacao)
                            .then(mensagem=>{
                               this._lista.add(negociacao);
                               this._mensagem.texto=mensagem;
                               this._limpaForm();
                            })
                            .catch(error=>this._mensagem.texto = error);
          }

           clear()
           {
               this._service.clear()
                            .then(mensagem => this._mensagem.texto = mensagem)
                            .then(() => this._lista.clean())
                            .catch(error=> this._mensagem.texto = error);
           }

           importa()
           {
              this._service.import(this._lista.negociacoes)
                     .then(lista=>{ lista.forEach(item=>this._lista.add(item))})
                     .then(()=> this._mensagem.texto = 'Negociações importadas com sucesso')
                     .catch(error=>this._mensagem.texto=error);
           }

           ordena(coluna)
           {
              if(this._ordemAtual==coluna)
              {
                  this._lista.inverte();
              }
              else
              {
                  this._ordemAtual = coluna;
                  this._lista.ordena(coluna);
              }
           }

           _criaNegociacao()
           {
               return new Negociacao(
                   DateHelper.textToDate(this._inputData.value),
                   this._inputQtd.value,
                   this._inputValor.value
               );
           }

           _limpaForm()
           {
               this._inputData.value  = '';
               this._inputQtd.value   = 1;
               this._inputValor.value = 0.0;
               this._inputData.focus();
           }

      }
