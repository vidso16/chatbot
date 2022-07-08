'use strict';

const dotenv = require('dotenv');
dotenv.config();

module.exports = (client, inventory, dfParameters, tipo_cambio) => {

	const MontoTotal = dfParameters.cantidad * dfParameters.to_charge;
	const monto = MontoTotal * 13 / 100;
	const montoTotalLinea = MontoTotal + monto;
	const TotalComprobante = MontoTotal + monto;
	 
	console.log(MontoTotal, monto, montoTotalLinea);
	
	const template = {
		"token": process.env.API_TOKEN,
		"type": "user",
		"user": "janeISK",
		"identification": "3102746044",
		"version": "1.0.2",
		"invoice_type": "01",
		"consecutive": false,
		"environment_prod": false,
		"require_pdf": true,
		"invoice": {
			"NumeroConsecutivo": "00100001",
			"CodigoActividad": "",
			"Emisor": "",
			"Receptor": {
				"Nombre": client.client_name,
				"Identificacion": {
					"Tipo": "01",
					"Numero": client.identification
				},
				"IdentificacionExtranjero": "",
				"Ubicacion": "",
				"Telefono": "",
				"CorreoElectronico": `${client.email}, davidsoto.v16@gmail.com`
			},
			"CondicionVenta": "01",
			"PlazoCredito": "",
			"MedioPago": ["04"],
			"DetalleServicio": [
				{
					"NumeroLinea": "1",
					"Codigo": inventory.cabys_code,
					"CodigoComercial": {
						"Tipo": "01",
						"Codigo": "1"
					},
					"Cantidad": dfParameters.cantidad,
					"UnidadMedida": "Sp",
					"Detalle": inventory.designation,
					"PrecioUnitario": dfParameters.to_charge,
					"MontoTotal": MontoTotal, // PrecioUnitario * Cantidad
					"Descuento": "",
					"SubTotal": MontoTotal, // = MontoTotal
					"Impuesto": {
						"Codigo": "01",
						"CodigoTarifa": "08",
						"Tarifa": 13,
						"Monto": monto, // SubTotal * Tarifa / 100
						"Exoneracion": ""
					},
					"ImpuestoNeto": 0,
					"MontoTotalLinea": montoTotalLinea // SubTotal + ImpuestoMonto
				}
			],
			"OtrosCargos": "",
			"ResumenFactura": {
				"CodigoTipoMoneda": {
					"CodigoMoneda": dfParameters.currency,
					"TipoCambio": dfParameters.currency == 'CRC' ? 1 : tipo_cambio.data.venta.valor,
				},
				"TotalServGravados": MontoTotal, // = MontoTotal
				"TotalServExentos": 0,
				"TotalServExonerado": 0,
				"TotalMercanciasGravadas": 0,
				"TotalMercanciasExentas": 0,
				"TotalMercExonerada": 0,
				"TotalGravado": MontoTotal, // = TotalServGravados
				"TotalExento": 0,
				"TotalExonerado": 0,
				"TotalVenta": MontoTotal, // = TotalGravado
				"TotalDescuentos": 0,
				"TotalVentaNeta": MontoTotal, // = TotalVenta
				"TotalImpuesto": monto, // = ImpuestoMonto
				"TotalOtrosCargos": 0,
				"TotalComprobante": TotalComprobante // TotalVenta + ImpuestoMonto
			},
			"InformacionReferencia": "",
			"Otros": {
				"OtroTexto": "Prueba desde chatbot"
			}
		}
	}

	return template;
}