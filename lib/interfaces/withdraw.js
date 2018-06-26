const PiastrixApi = require('../');

PiastrixApi.prototype.withdrawCreate = async function({account, amount_type='ps_amount', amount, payway,
																												shop_currency=this.Currency['rub'], shop_id=this.shop_id, shop_payment_id}) {


	if (typeof account !== 'string') {
		throw new Error('account is required');
	}

	if (typeof amount !== 'number') {
		throw new Error('amount is required');
	}

	if (typeof payway !== 'string') {
		throw new Error('payway is required');
	}

	if (typeof shop_payment_id !== 'string') {
		throw new Error('shop_payment_id is required');
	}

	let response;
	let now = new Date().toISOString(); //нужно для определения статуса платежа в случае time out

	try {
		response = await this.request({"httpMethod": 'POST', "iface": 'withdraw', "method": 'create', "data": {account, amount_type,
			amount, payway, shop_currency, shop_id, shop_payment_id}});
	} catch (e) {
		response = undefined;
	}

	// если наступил time out или другая любая http ошибка, то проверяем статус платежа
	if (typeof response === 'undefined') {
		response = await this.withdrawShopPaymentStatus({shop_id, shop_payment_id, now});
	}

	// если в json теле ответа есть ошибка возвращаем ее пользователю
	if (response['data'].result === false) {
		throw new Error(response['data']['message']);
	}

	// если все ок, возвращаем саму выплату без дополнительных переменных ответа
	return response['data']['data'];
};

PiastrixApi.prototype.withdrawShopPaymentStatus = async function({shop_id=this.shop_id, now, shop_payment_id}) {
	if (typeof now !== 'string') {
		throw new Error('now is required');
	}

	if (typeof shop_payment_id !== 'string') {
		throw new Error('shop_payment_id is required');
	}

	return await this.request({"httpMethod": 'POST', "iface": 'withdraw', "method": 'shop_payment_status', "data": {shop_id, now, shop_payment_id}});
};