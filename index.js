const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'POST');
		return res.status(200).json({});
	}
	next();
});

require('./routes/routes')(app);
require('./routes/fulfillmentRoutes')(app);

const PORT = process.env.PORT || 80;
//console.log(PORT);
app.listen(PORT); 