// https://nuxt.com/docs/api/configuration/nuxt-config
// require('dotenv').config();
export default defineNuxtConfig({
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	}
});
