const {WebhookClient} = require('dialogflow-fulfillment');
const fnCreateInvoice = require('../intents/create_invoice');
const fnWelcome = require('../intents/welcome_message');

module.exports = app => {
	app.post('/', async (req, res) => {
		const agent = new WebhookClient({request: req, response: res});

		let intentMap = new Map();
		intentMap.set('Bienvenido BOT', fnWelcome);
		intentMap.set('Create Invoice', fnCreateInvoice);
		agent.handleRequest(intentMap);
	});
}