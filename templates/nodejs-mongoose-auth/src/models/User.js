const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', async function(next) {
	try {
		if (this.password.length < 6) {
			throw new Error('Invalid password');
		}
		const salt = await bcrypt.genSalt(10);
		const passwordhash = await bcrypt.hash(this.password, salt);
		this.password = passwordhash;
		next();
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.isValidPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = mongoose.model('User', UserSchema);
