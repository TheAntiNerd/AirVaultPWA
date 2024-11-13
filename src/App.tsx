import { useState, useEffect } from 'react';

function App() {
	const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
	const [isInstallable, setIsInstallable] = useState(false);

	useEffect(() => {
		// Listen for the beforeinstallprompt event
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
			setDeferredPrompt(e); // Store the event so it can be triggered later
			setIsInstallable(true); // Show the install button
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	const handleInstallClick = async () => {
		if (deferredPrompt && 'prompt' in deferredPrompt) {
			const promptEvent = deferredPrompt as any;
			promptEvent.prompt(); // Show the install prompt
			const { outcome } = await promptEvent.userChoice;
			if (outcome === 'accepted') {
				console.log('PWA installed');
			} else {
				console.log('PWA installation rejected');
			}
			setDeferredPrompt(null); // Clear the deferred prompt
			setIsInstallable(false); // Hide the install button
		}
	};

	return (
		<div className="App">
			<h1>Welcome to Your PWA!</h1>
			{/* Conditionally render the install button */}
			{isInstallable && <button onClick={handleInstallClick}>Install App</button>}
			{/* Your other app components go here */}
		</div>
	);
}

export default App;
