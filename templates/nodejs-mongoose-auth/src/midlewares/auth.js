require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
	auth(req, res, next) {
		let token =
			req.headers['x-access-token'] || req.headers['authorization'];
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length);
		}

		if (token) {
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					return res.status(405).json({
						success: false,
						message: 'Token inválido'
					});
				} else {
					req.username = decoded.data;
					next();
				}
			});
		} else {
			return res.status(405).json({
				success: false,
				message: 'Token não fornecido'
			});
		}
	}
};
