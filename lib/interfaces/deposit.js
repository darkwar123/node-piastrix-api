const PiastrixApi = require('../');
const querystring = require('querystring');

PiastrixApi.prototype.depositResult = function(query) {
	const params = query || {};
	const sign = this.makeSign(params);

	return String(params['sign']).toLowerCase() === sign.toLowerCase();
};

PiastrixApi.prototype.depositCreate = function({ amount, currency=this.Currency['rub'],
																								 shop_id=this.shop_id, description='', shop_order_id }) {

	amount = Number(amount);

	if (Number.isNaN(amount) || amount <= 0) {
		throw new Error('amount is required');
	}

	if (typeof shop_order_id === 'undefined') {
		throw new Error('shop_order_id is required');
	}

	shop_order_id = String(shop_order_id);
	let sign = this.makeSign({ shop_id, currency, amount, shop_order_id });

	return 'https://pay.piastrix.com/ru/pay?' + querystring.encode({ shop_id, currency, amount, shop_order_id, description, sign });
};