require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose
	.connect(process.env.MONGODB_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(process.env.PORT || 8888, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});

module.exports = app;
