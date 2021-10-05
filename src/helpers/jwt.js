const expressJWT = require("express-jwt");

const isRevoked = (req, payload, done) => {
	if (!payload.isAdmin) {
		done(null, true);
	}
	done();
};

const authJWT = () => {
	const secret = process.env.SECRET_KEY;
	const API_URL = process.env.API_URl;
	return expressJWT({
		secret,
		algorithms: ["HS256"],
		isRevoked,
	}).unless({
		path: [
			{ url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
			{ url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
			{
				url: /\/public\/uploads(.*)/,
				methods: ["GET", "OPTIONS"],
			},
			`${API_URL}/auth/login`,
			`${API_URL}/auth/signup`,
		],
	});
};

module.exports = authJWT;
