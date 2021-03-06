'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, NegociacaoDAO;

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

            _export('NegociacaoDAO', NegociacaoDAO = function () {
                function NegociacaoDAO(connection) {
                    _classCallCheck(this, NegociacaoDAO);

                    this._connection = connection;
                    this._store = 'negociacoes';
                }

                _createClass(NegociacaoDAO, [{
                    key: 'add',
                    value: function add(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (e) {
                                return resolve();
                            };
                            request.onerror = function (e) {
                                reject(e.target.error.name);
                            };
                        });
                    }
                }, {
                    key: 'listAll',
                    value: function listAll() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            var negociacoes = [];

                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            cursor.onsuccess = function (e) {

                                var atual = e.target.result;

                                if (atual) {
                                    var dado = atual.value;
                                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                                    atual.continue();
                                } else {
                                    resolve(negociacoes);
                                }
                            };

                            cursor.onerror = function (e) {
                                return reject('N??o foi possivel carregar as negociac??es');
                            };
                        });
                    }
                }, {
                    key: 'clear',
                    value: function clear() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            cursor.onsuccess = function (e) {
                                return resolve('Negocia????es apagadas com sucesso');
                            };

                            cursor.onerror = function (e) {
                                return reject('Ocorreu um erro ao apagar as negocia????es');
                            };
                        });
                    }
                }]);

                return NegociacaoDAO;
            }());

            _export('NegociacaoDAO', NegociacaoDAO);
        }
    };
});
//# sourceMappingURL=NegociacaoDAO.js.map