'use strict';

const dbOptions = require('../config.js');
const db = require('../database');
const xmlTemplate = require('../functions/xmlTemplate');
const axios = require('axios').default;
const valores = [];
module.exports = async agent => {

	const pool = new db(dbOptions);


	await pool.query('SELECT * FROM clients WHERE contact LIKE ?', [agent.parameters.person[0].name])
		.then(client_result => {
			valores.push(client_result);

			return pool.query('SELECT * FROM inventory WHERE designation LIKE ?', [agent.parameters.inventory])
		})
		.then(inventory_result => {
			valores.push(inventory_result);

			pool.close();

			return axios.get('https://api.hacienda.go.cr/indicadores/tc/dolar')
		})
		.then((tipo_cambio) => {
			console.log(tipo_cambio.data.venta.valor);

			const xml = xmlTemplate(valores[0][0], valores[1][0], agent.parameters, tipo_cambio);
			return axios.post('https://apidev.iskce.com/invoicereception', xml);
		})
		.then(() => {
			// 2. CONSULTA TIPO DE CAMBIO
	
			console.log(valores)
			agent.add(`${agent.parameters.person[0]['name']} tu factura fue creada con descripción de ${agent.parameters.inventory}`);
		})
		.catch((err) => {
			pool.close();
			console.log(err);
			agent.add(`Hubo un problema al crear la factura, Por favor vuelva a intentar mas tarde`);
		});
}