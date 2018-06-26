const PiastrixApi = require('../');
const PayWay = require('../enums/PayWay');
const Currency = require('../enums/Currency');

PiastrixApi.__proto__.PayWay = PayWay;
PiastrixApi.__proto__.Currency = Currency;

PiastrixApi.prototype.PayWay = PayWay;
PiastrixApi.prototype.Currency = Currency;