# Piastrix API for Node.js
[![npm version](https://img.shields.io/npm/v/piastrix-api.svg)](https://npmjs.com/package/piastrix-api)
[![npm downloads](https://img.shields.io/npm/dm/piastrix-api.svg)](http://npm-stat.com/charts.html?package=piastrix-api)
[![license](https://img.shields.io/npm/l/piastrix-api.svg)](https://github.com/darkwar123/node-piastrix-api/blob/master/LICENSE)

This module is designed for manage API of [Piastrix](https://piastrix.com/).

**You absolutely need Node.js v6.0.0 or later or this won't work.**

Install it from [npm](https://www.npmjs.com/package/piastrix-api)

# Example

```javascript
const PiastrixApi = require('piastrix-api');
const PayWay = PiastrixApi.PayWay;
const Currency = PiastrixApi.Currency;
const api = new PiastrixApi({"shop_id": 1, "secret": 'secret'});

// Send request to /withdraw/create with {"amount": 10, "payway": PayWay['qiwi_rub'], "currency": Currency['rub']} params
api.withdraw.create({"amount": 10, "payway": PayWay['qiwi_rub'], "currency": Currency['rub']}).then(console.log).catch(console.error);
```

## Installing

Using npm:

```bash
$ npm install piastrix-api
```

# Support

If you use it and you need more api methods, please make an issue and I will help you.
Report bugs on the [issue tracker](https://github.com/darkwar123/node-piastrix-api/issues)