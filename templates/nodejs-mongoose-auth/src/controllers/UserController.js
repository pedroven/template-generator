require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
	async signin(req, res) {
		const { username, password } = req.body;

		if (username && password) {
			const user = await User.findOne({ username });
			if (user) {
				const isMatch = await user.isValidPassword(password);
				if (!isMatch) {
					return res.status(403).json({
						success: false,
						message: 'Senha inválida',
						token: token
					});
				}
				const token = jwt.sign(user.username, process.env.SECRET, {
					expiresIn: '1h'
				});
				return res.json({
					success: true,
					message: 'Autenticado com sucesso',
					token: token
				});
			} else {
				return res.status(403).json({
					success: false,
					message: 'Usuário ou senha inválidos'
				});
			}
		} else {
			return res.status(400).json({
				success: false,
				message: 'Requisição inválida'
			});
		}
	},

	async signup(req, res) {
		const { username, password } = req.body;

		let user = await User.findOne({ username });
		if (!user) {
			try {
				user = await User.create({
					username,
					password
				});
				return res
					.status(201)
					.json({ msg: 'Usuário criado com sucesso' });
			} catch (error) {
				return res.status(403).json({ error: 'Senha inválida' });
			}
		}

		return res.status(401).json({ error: 'Usuário já existe' });
	}
};
