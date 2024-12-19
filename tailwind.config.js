/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			colors: {
				primary: {
					heading: '#3D4366', // heading
					para: '#44475B', // paragraph
					searchFilter: '#6C6E7A', // search type and modified
				},
				/* secondary: {
					DEFAULT: '#ffed4a',
					light: '#fff9c2',
					dark: '#d97706',
				}, */
				hover: '#EDF3FA',
				border: '#BCC0E0',
				buttonPrimary: '#298DFF',
				selected: '#D6ECFF',
				checkboxTicked: '#146EFE',
				borderView: '#298DFF',
			},
		},
	},
	plugins: [],
};
