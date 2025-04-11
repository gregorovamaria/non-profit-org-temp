/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Karla", "ui-sans-serif", "system-ui"],
				serif: ["Spectral", "ui-serif", "Georgia"],
				mono: ["ui-monospace", "SFMono-Regular"],
				body: ["Karla", "sans-serif", "ui-sans-serif", "system-ui"],
				headingFont: ["Spectral", " serif"],
			},
			listStyleType: {
				circle: "circle",
			},
		},
		screens: {
			xs: "475px",
			...defaultTheme.screens,
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: ["nord", "night", "dim", "dracula"],
	},
};
