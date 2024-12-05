/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'], // Set Poppins as the default sans font
			},
			boxShadow: {
				custom: '0px 79px 32px 0px rgba(0, 0, 0, 0.01)', // Your Figma shadow
			  },
		},
	},
	plugins: [],
};
