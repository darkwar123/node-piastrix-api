/**
 * Modules
 * */
const debug = require('debug');
const axios = require('axios');
const crypto = require('crypto');

/**
 * Constants
 * */
const ENDPOINT_TIMEOUT = 30000;
const DEBUG_PREFIX = 'piastrix-api';
const ENDPOINT_URL = 'https://core.piastrix.com/';

class PiastrixApi {
	constructor({shop_id, secret}) {
		this.shop_id = shop_id || -1;
		this.secret = secret || '';

		this.debug = debug(DEBUG_PREFIX + ':' + this.shop_id);
		this.error = debug(DEBUG_PREFIX + ':' + this.shop_id + ':' + 'error');

		this.axios = axios.create({"responseType": 'json', "baseURL": ENDPOINT_URL, "timeout": ENDPOINT_TIMEOUT});
		this.axios.interceptors.response.use((config) => config, this.handleRequestError.bind(this));
	}


	handleRequestError(error) {
		this.error(error['message']);
		return Promise.reject(error);
	}


	request({baseURL, headers, httpMethod = 'post', iface, method, data={}}={}) {
		if (typeof iface !== 'string') {
			throw new Error('iface is required');
		}

		if (typeof method !== 'string') {
			throw new Error('method is required');
		}

		let url = [iface, method].join('/');

		data['sign'] = this.makeSign(data);
		baseURL = baseURL || this.axios.defaults["baseURL"];
		headers = Object.assign(Object.assign({}, this.axios.defaults["headers"]), headers);

		this.debug('send request %o', {baseURL, httpMethod, iface, method, data, headers});

		return this.axios({
			"url": url,
			"baseURL": baseURL,
			"headers": headers,
			"method": httpMethod,
			[httpMethod.toLowerCase() === 'get' ? 'params' : 'data']: data,
		});
	}


	makeSign(params) {
		let hash = [];
		let keys = Object.keys(params);
		let i, len = keys.length, sorted = {};

		keys.sort();

		for (i = 0; i < len; i++) {
			if (
				keys[i] !== 'sign'
				&& params[keys[i]] !== ''
				&& params[keys[i]] !== null
			) {
				sorted[keys[i]] = params[keys[i]];
			}
		}

		for (let i in sorted) {
			hash.push(sorted[i]);
		}

		hash = hash.join(':');
		hash += this.secret;
		return new Buffer(crypto.createHash('sha256').update(hash).digest('binary'), 'binary').toString('hex');
	}

	get withdraw() {
		return {
			'create': this.withdrawCreate.bind(this),
			'shop_payment_status': this.withdrawShopPaymentStatus.bind(this),
		};
	}
}

module.exports = PiastrixApi;
require('./components/statics');
require('./interfaces/withdraw');