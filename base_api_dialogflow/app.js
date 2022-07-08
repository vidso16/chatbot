'use strict';

const url = 'http://localhost:80/';
 
const ajax = (function() {

	return (urlPath, params = {}, method = 'GET', async = true) => {

		return new Promise((resolve, reject) => {
			const http = new XMLHttpRequest();
			http.open(method, urlPath, async);
			http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

			http.addEventListener('load', (e) => { 
				try {
					const response = JSON.parse(e.currentTarget.response);
	    				if (response.code == 409) {
						reject(JSON.parse(e.currentTarget.response));
					} else {
						resolve(JSON.parse(e.currentTarget.response));
					}
				} catch (error) {
					console.log('LOAD:');
					console.log(error.currentTarget);
					reject(JSON.parse('{"response":"Error de consulta"}'));
				}
			});

			http.addEventListener('error', (e) => {
				console.log('ERROR:');
				console.log(e.currentTarget);
				reject(JSON.parse('{"response":"Error de consulta"}'));
			});

			http.send(JSON.stringify(params));
		});

	};

})();

getToken();


function getToken() {
	ajax(`${url}get_token`, {}, 'GET', true)
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		});
}