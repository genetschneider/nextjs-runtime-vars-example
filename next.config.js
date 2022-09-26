const { assetPrefix } = require('./build');

module.exports = {
	publicRuntimeConfig: {
		SECRET_X: process.env.SECRET_X || 'REPLACED_AT_RUNTIME_SECRET_X',
	},
	assetPrefix: `/${assetPrefix}`,
	i18n: {
		locales: ['et', 'fr', 'en', 'und'],
		defaultLocale: 'und',
	},
};