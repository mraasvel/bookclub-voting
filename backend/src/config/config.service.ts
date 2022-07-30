export default () => ({
	APP_NAME: process.env.APP_NAME,
	WEBSITE_URL: process.env.WEBSITE_URL,
	oauth: {
		intra: {
			CLIENT_ID: process.env.INTRA_CLIENT_ID,
			CLIENT_SECRET: process.env.INTRA_CLIENT_SECRET,
			CALLBACK_URL: `${process.env.WEBSITE_URL}/api/auth/login`, // OAuth provider redirects to this to finalize authentication
		},
		REDIRECT_URL: `${process.env.WEBSITE_URL}`, // We redirect to this after OAuth flow
	},
	POSTGRES_USER: process.env.POSTGRES_USER,
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	POSTGRES_DB: process.env.POSTGRES_DB,
	cookie: {
		// TODO: make environment variables and random/secret
		NAME: 'CookieName',
		SECRET: 'CookieSecret',
	},
});
