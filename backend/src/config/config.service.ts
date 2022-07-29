export default () => ({
	APP_NAME: process.env.APP_NAME,
	DOMAIN_NAME: process.env.DOMAIN_NAME,
	oauth: {
		intra: {
			CLIENT_ID: process.env.INTRA_CLIENT_ID,
			CLIENT_SECRET: process.env.INTRA_CLIENT_SECRET,
			CALLBACK_URL: `http://${process.env.DOMAIN_NAME}/auth/login`, // OAuth provider redirects to this to finalize authentication
		},
		REDIRECT_URL: `http://${process.env.DOMAIN_NAME}`, // We redirect to this after OAuth flow
	},
	cookie: {
		// TODO: make environment variables and random/secret
		NAME: 'CookieName',
		SECRET: 'CookieSecret',
	},
});
