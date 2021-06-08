import {View} from './View';
import {DateHelper} from '../helper/DateHelper';

export class NegociacaoView extends View
{
      _template(model)
     {
        return `<table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th onclick="negociacaoControler.ordena('data')"> DATA</th>
                  <th onclick="negociacaoControler.ordena('quantidade')">QUANTIDADE</th>
                  <th onclick="negociacaoControler.ordena('valor')">VALOR</th>
                  <th onclick="negociacaoControler.ordena('volume')">VOLUME</th>
                </tr>
              <thead>

              <tbody>
                  ${model.negociacoes.map(n=>`
                       <tr>
                           <td>${DateHelper.dateToText(n.data)}</td>
                           <td>${n.quantidade}</td>
                           <td>${n.valor}</td>
                           <td>${n.volume}</td>
                       </tr>`
                  ).join('')}
              </tbody>

              <tfoot>
                  <td colspan="3" align="right">Total</td>
                  <td>${model.negociacoes.reduce((total,n)=>total+n.volume,0.0)}</td>
              </tfoot>
          </table>`;
     }
}
