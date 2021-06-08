"use strict";

System.register([], function (_export, _context) {
     "use strict";

     var _createClass, ListaNegociacao;

     function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
               throw new TypeError("Cannot call a class as a function");
          }
     }

     return {
          setters: [],
          execute: function () {
               _createClass = function () {
                    function defineProperties(target, props) {
                         for (var i = 0; i < props.length; i++) {
                              var descriptor = props[i];
                              descriptor.enumerable = descriptor.enumerable || false;
                              descriptor.configurable = true;
                              if ("value" in descriptor) descriptor.writable = true;
                              Object.defineProperty(target, descriptor.key, descriptor);
                         }
                    }

                    return function (Constructor, protoProps, staticProps) {
                         if (protoProps) defineProperties(Constructor.prototype, protoProps);
                         if (staticProps) defineProperties(Constructor, staticProps);
                         return Constructor;
                    };
               }();

               _export("ListaNegociacao", ListaNegociacao = function () {
                    function ListaNegociacao() {
                         _classCallCheck(this, ListaNegociacao);

                         this._listaNegociacao = [];
                    }

                    _createClass(ListaNegociacao, [{
                         key: "add",
                         value: function add(negociacao) {
                              this._listaNegociacao.push(negociacao);
                         }
                    }, {
                         key: "ordena",
                         value: function ordena(coluna) {
                              this._listaNegociacao.sort(function (a, b) {
                                   return a[coluna] - b[coluna];
                              });
                         }
                    }, {
                         key: "inverte",
                         value: function inverte() {
                              this._listaNegociacao.reverse();
                         }
                    }, {
                         key: "clean",
                         value: function clean() {
                              this._listaNegociacao.length = 0;
                         }
                    }, {
                         key: "negociacoes",
                         get: function get() {
                              return [].concat(this._listaNegociacao);
                         }
                    }]);

                    return ListaNegociacao;
               }());

               _export("ListaNegociacao", ListaNegociacao);
          }
     };
});
//# sourceMappingURL=ListaNegociacao.js.map