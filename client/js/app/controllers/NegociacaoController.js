'use strict';

System.register(['../helper/Bind', '../helper/DateHelper', '../service/NegociacaoService', '../model/ListaNegociacao', '../model/Negociacao', '../model/Mensagem', '../view/NegociacaoView', '../view/MensagemView'], function (_export, _context) {
    "use strict";

    var Bind, DateHelper, NegociacaoService, ListaNegociacao, Negociacao, Mensagem, NegociacaoView, MensagemView, _createClass, NegociacaoController;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_helperBind) {
            Bind = _helperBind.Bind;
        }, function (_helperDateHelper) {
            DateHelper = _helperDateHelper.DateHelper;
        }, function (_serviceNegociacaoService) {
            NegociacaoService = _serviceNegociacaoService.NegociacaoService;
        }, function (_modelListaNegociacao) {
            ListaNegociacao = _modelListaNegociacao.ListaNegociacao;
        }, function (_modelNegociacao) {
            Negociacao = _modelNegociacao.Negociacao;
        }, function (_modelMensagem) {
            Mensagem = _modelMensagem.Mensagem;
        }, function (_viewNegociacaoView) {
            NegociacaoView = _viewNegociacaoView.NegociacaoView;
        }, function (_viewMensagemView) {
            MensagemView = _viewMensagemView.MensagemView;
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

            _export('NegociacaoController', NegociacaoController = function () {
                _createClass(NegociacaoController, [{
                    key: '_init',
                    value: function _init() {
                        var _this = this;

                        this._service.listaAll().then(function (list) {
                            return list.forEach(function (item) {
                                return _this._lista.add(item);
                            });
                        }).catch(function (error) {
                            return _this._mensagem.texto = error;
                        });

                        setInterval(function () {
                            return _this.importa();
                        }, 3000);
                    }
                }]);

                function NegociacaoController() {
                    _classCallCheck(this, NegociacaoController);

                    var $ = document.querySelector.bind(document);

                    this._inputData = $("#data");
                    this._inputValor = $("#valor");
                    this._inputQtd = $("#quantidade");
                    this._ordemAtual = '';

                    this._lista = new Bind(new ListaNegociacao(), new NegociacaoView($("#listaNegociacao")), 'add', 'clean', 'ordena', 'inverte');
                    this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagem")), 'texto');
                    this._service = new NegociacaoService();

                    this._init();
                }

                _createClass(NegociacaoController, [{
                    key: 'adiciona',
                    value: function adiciona(event) {
                        var _this2 = this;

                        event.preventDefault();
                        var negociacao = this._criaNegociacao();

                        this._service.add(negociacao).then(function (mensagem) {
                            _this2._lista.add(negociacao);
                            _this2._mensagem.texto = mensagem;
                            _this2._limpaForm();
                        }).catch(function (error) {
                            return _this2._mensagem.texto = error;
                        });
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        var _this3 = this;

                        this._service.clear().then(function (mensagem) {
                            return _this3._mensagem.texto = mensagem;
                        }).then(function () {
                            return _this3._lista.clean();
                        }).catch(function (error) {
                            return _this3._mensagem.texto = error;
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa() {
                        var _this4 = this;

                        this._service.import(this._lista.negociacoes).then(function (lista) {
                            lista.forEach(function (item) {
                                return _this4._lista.add(item);
                            });
                        }).then(function () {
                            return _this4._mensagem.texto = 'Negociações importadas com sucesso';
                        }).catch(function (error) {
                            return _this4._mensagem.texto = error;
                        });
                    }
                }, {
                    key: 'ordena',
                    value: function ordena(coluna) {
                        if (this._ordemAtual == coluna) {
                            this._lista.inverte();
                        } else {
                            this._ordemAtual = coluna;
                            this._lista.ordena(coluna);
                        }
                    }
                }, {
                    key: '_criaNegociacao',
                    value: function _criaNegociacao() {
                        return new Negociacao(DateHelper.textToDate(this._inputData.value), this._inputQtd.value, this._inputValor.value);
                    }
                }, {
                    key: '_limpaForm',
                    value: function _limpaForm() {
                        this._inputData.value = '';
                        this._inputQtd.value = 1;
                        this._inputValor.value = 0.0;
                        this._inputData.focus();
                    }
                }]);

                return NegociacaoController;
            }());

            _export('NegociacaoController', NegociacaoController);
        }
    };
});
//# sourceMappingURL=NegociacaoController.js.map