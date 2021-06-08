'use strict';

System.register(['./HttpService', './ConnectionFactory', '../model/Negociacao', '../dao/NegociacaoDAO'], function (_export, _context) {
      "use strict";

      var HttpService, ConnectionFactory, Negociacao, NegociacaoDAO, _createClass, NegociacaoService;

      function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
            }
      }

      return {
            setters: [function (_HttpService) {
                  HttpService = _HttpService.HttpService;
            }, function (_ConnectionFactory) {
                  ConnectionFactory = _ConnectionFactory.ConnectionFactory;
            }, function (_modelNegociacao) {
                  Negociacao = _modelNegociacao.Negociacao;
            }, function (_daoNegociacaoDAO) {
                  NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
            }],
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

                  _export('NegociacaoService', NegociacaoService = function () {
                        function NegociacaoService() {
                              _classCallCheck(this, NegociacaoService);

                              this._http = new HttpService();
                              this._urlSemana = 'negociacoes/semana';
                              this._urlSemanaAnterior = 'negociacoes/anterior';
                              this._urlSemanaRetrasada = 'negociacoes/retrasada';
                        }

                        _createClass(NegociacaoService, [{
                              key: 'obterNegociacoes',
                              value: function obterNegociacoes() {
                                    return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (periodos) {
                                          return periodos.reduce(function (flat, item) {
                                                return flat.concat(item);
                                          }, []);
                                    }).catch(function (error) {
                                          throw new Error(error);
                                    });
                              }
                        }, {
                              key: 'obterNegociacoesSemana',
                              value: function obterNegociacoesSemana() {
                                    return this._http.get(this._urlSemana).then(function (lista) {
                                          return lista.map(function (obj) {
                                                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                                          });
                                    }).catch(function (error) {
                                          throw new Error("Não foi possível obter as negociações da semana");
                                    });
                              }
                        }, {
                              key: 'obterNegociacoesSemanaAnterior',
                              value: function obterNegociacoesSemanaAnterior() {
                                    return this._http.get(this._urlSemanaAnterior).then(function (lista) {
                                          return lista.map(function (obj) {
                                                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                                          });
                                    }).catch(function (error) {
                                          throw new Error("Não foi possível obter as negociações da semana anterior");
                                    });
                              }
                        }, {
                              key: 'obterNegociacoesSemanaRetrasada',
                              value: function obterNegociacoesSemanaRetrasada() {
                                    return this._http.get(this._urlSemanaRetrasada).then(function (lista) {
                                          return lista.map(function (obj) {
                                                return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
                                          });
                                    }).catch(function (error) {
                                          throw new Error("Não foi possível obter as negociações da semana retrasada");
                                    });
                              }
                        }, {
                              key: 'listaAll',
                              value: function listaAll() {
                                    return ConnectionFactory.getConnection().then(function (connection) {
                                          return new NegociacaoDAO(connection);
                                    }).then(function (dao) {
                                          return dao.listAll();
                                    }).catch(function (error) {
                                          throw new Error(error);
                                    });
                              }
                        }, {
                              key: 'add',
                              value: function add(negociacao) {
                                    return ConnectionFactory.getConnection().then(function (connection) {
                                          return new NegociacaoDAO(connection);
                                    }).then(function (dao) {
                                          return dao.add(negociacao);
                                    }).then(function () {
                                          return 'Negociação adicionada com sucesso';
                                    }).catch(function (error) {
                                          throw new Error('Não foi possível adicionar a negociação');
                                    });
                              }
                        }, {
                              key: 'clear',
                              value: function clear() {
                                    return ConnectionFactory.getConnection().then(function (connection) {
                                          return new NegociacaoDAO(connection);
                                    }).then(function (dao) {
                                          return dao.clear();
                                    }).then(function () {
                                          return 'Negociações apagadas com sucesso';
                                    }).catch(function (error) {
                                          throw new Error('Não foi possível remover as negociações');
                                    });
                              }
                        }, {
                              key: 'import',
                              value: function _import(listaAtual) {
                                    return this.obterNegociacoes().then(function (negociacoes) {
                                          return negociacoes.filter(function (negociacao) {
                                                return !listaAtual.some(function (item) {
                                                      return JSON.stringify(negociacao) == JSON.stringify(item);
                                                });
                                          });
                                    }).catch(function (error) {
                                          throw new Error(error);
                                    });
                              }
                        }]);

                        return NegociacaoService;
                  }());

                  _export('NegociacaoService', NegociacaoService);
            }
      };
});
//# sourceMappingURL=NegociacaoService.js.map