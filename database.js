'use strict';

const mysql = require('mysql');

class Database {
	constructor(options) {
		this.connection = mysql.createPool(options);
	}
	query(sql, values) {
		return new Promise((resolve, reject) => {
			this.connection.query({sql, values, timeout: 10000}, (error, rows) => {
				if (error) {
					console.log(error);
					return reject(error);
				}
				resolve(rows);
			});
		});
	}
	close() {
		return new Promise((resolve, reject) => {
			this.connection.end(error => {
				if (error) {
					console.log(error);
					return reject(error);
				}
				resolve();
			});
		});
	}
}

module.exports = Database;