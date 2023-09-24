const jwt = require('jsonwebtoken');

const secret = '$uperman@123';

function createTokenForUser(user){
	const payload = {
		_id: user._id,
		fullname: user.fullname,
		email: user.email,
		profileimageurl: user.profileimageurl,
		role: user.role
	}
	
	const token = jwt.sign(payload, secret)
	
	return token;
}

function validateToken(token){
	const payload = jwt.verify(token, secret)
	
	return payload;
}

module.exports = {
	createTokenForUser,
	validateToken
}