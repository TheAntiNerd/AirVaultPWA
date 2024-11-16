import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import PreventBackNavigation from './components/navigation/PreventBackNavigation.tsx';
import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
	registerSW({
		immediate: true,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onRegistered(r: any) {
			r &&
				setInterval(() => {
					console.log('Updating worker...');
					r.update();
				}, 1000 * 60 * 1); // 1 min
		},
	});
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<>
			<App />
			<PreventBackNavigation />
		</>
	</StrictMode>
);
