"use client"
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: '', // Global font family set to Poppins
	},
	components: {
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontFamily: ', sans-serif', // Ensures Poppins font is applied globally
				},
			},
		},
	},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export { ThemeProvider };
