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
				hover: '#EDF3FA',
				border: '#BCC0E0',
				buttonPrimary: '#298DFF',
				selected: '#D6ECFF',
				checkboxTicked: '#146EFE',
				borderView: '#298DFF',
				pressed: '#3c495e',
			},
			animation: {
				slideIn: 'slideIn 0.5s ease-in-out forwards',
				slideOut: 'slideOut 0.5s ease-in-out forwards',
			},
			keyframes: {
				slideIn: {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				slideOut: {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(100%)', opacity: '0' },
				},
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
			scale: ['active'],
		},
	},
	plugins: [],
};
