'use strict';

const googleAuth = require('google-oauth-jwt');
const config = require('../config/keys');

module.exports = app => {
	app.get('/get_token', async (req, res) => {
		googleAuth.authenticate({
			email: config.GOOGLE_CLIENT_EMAIL,
			key: config.GOOGLE_PRIVATE_KEY,
			scopes: ['https://www.googleapis.com/auth/cloud-platform']
		}, function (err, token) {
			if (err) {
				res.status(401).json({
					token: ''
				});
			} else {
				res.status(200).json({
					token
				});
			}
		});
	});
};