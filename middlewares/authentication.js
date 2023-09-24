const service = require('../services/authentication')

function checkForAuthenticationCookie(cookieName){
	return (req, res, next) => {
		const tokenCookieValue = req.cookies[cookieName];

		if(!tokenCookieValue){
			return next();
		}
		
		try{
			const userPayload = service.validateToken(tokenCookieValue)
			req.user = userPayload;			
		}catch{}
		
		return next();
	}
}

module.exports = {
	checkForAuthenticationCookie
}