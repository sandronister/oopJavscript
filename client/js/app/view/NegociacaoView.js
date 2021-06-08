'use strict';

System.register(['./View', '../helper/DateHelper'], function (_export, _context) {
    "use strict";

    var View, DateHelper, _createClass, NegociacaoView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }, function (_helperDateHelper) {
            DateHelper = _helperDateHelper.DateHelper;
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

            _export('NegociacaoView', NegociacaoView = function (_View) {
                _inherits(NegociacaoView, _View);

                function NegociacaoView() {
                    _classCallCheck(this, NegociacaoView);

                    return _possibleConstructorReturn(this, (NegociacaoView.__proto__ || Object.getPrototypeOf(NegociacaoView)).apply(this, arguments));
                }

                _createClass(NegociacaoView, [{
                    key: '_template',
                    value: function _template(model) {
                        return '<table class="table table-hover table-bordered">\n              <thead>\n                <tr>\n                  <th onclick="negociacaoControler.ordena(\'data\')"> DATA</th>\n                  <th onclick="negociacaoControler.ordena(\'quantidade\')">QUANTIDADE</th>\n                  <th onclick="negociacaoControler.ordena(\'valor\')">VALOR</th>\n                  <th onclick="negociacaoControler.ordena(\'volume\')">VOLUME</th>\n                </tr>\n              <thead>\n\n              <tbody>\n                  ' + model.negociacoes.map(function (n) {
                            return '\n                       <tr>\n                           <td>' + DateHelper.dateToText(n.data) + '</td>\n                           <td>' + n.quantidade + '</td>\n                           <td>' + n.valor + '</td>\n                           <td>' + n.volume + '</td>\n                       </tr>';
                        }).join('') + '\n              </tbody>\n\n              <tfoot>\n                  <td colspan="3" align="right">Total</td>\n                  <td>' + model.negociacoes.reduce(function (total, n) {
                            return total + n.volume;
                        }, 0.0) + '</td>\n              </tfoot>\n          </table>';
                    }
                }]);

                return NegociacaoView;
            }(View));

            _export('NegociacaoView', NegociacaoView);
        }
    };
});
//# sourceMappingURL=NegociacaoView.js.map