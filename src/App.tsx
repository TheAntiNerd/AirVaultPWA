import { useState, useEffect } from 'react';
import LoaderFull from './components/wait/LoaderFull';
import Logo from './assets/logo.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { Navigate } from 'react-router';
import Home from './components/ui/home';

// function to check if PWA is already installed
const isPWAInstalled = () => {
	const navigator: any = window.navigator;
	return navigator?.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
};

function App() {
	const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
	const [isInstallable, setIsInstallable] = useState(false);
	const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 3000); // check for 13 seconds if the app is installable

		// Listen for the beforeinstallprompt event
		const handleBeforeInstallPrompt = (e: Event) => {
			clearTimeout(timer); // Cancel the timer
			setLoading(false); // Set loading to false
			e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
			setDeferredPrompt(e); // Store the event so it can be triggered later
			setIsInstallable(true); // Show the install button
		};

		// check if PWA is already installed
		if (isPWAInstalled()) {
			console.log('PWA already installed');
			setIsAlreadyInstalled(true);
			clearTimeout(timer);
			setLoading(false);
		}

		// listen for the beforeinstallprompt event
		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		// listen for the appinstalled event
		window.addEventListener('appinstalled', () => {
			setIsAlreadyInstalled(true);
			clearTimeout(timer);
			setLoading(false);
		});

		return () => {
			clearTimeout(timer); // Clear the timer if the effect is cleaned up
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

	return loading ? (
		<LoaderFull />
	) : (
		<div className="App w-full min-h-screen flex justify-center items-center">
			<Router>
				<Routes>


					{isAlreadyInstalled ? (
						<>
							<Route path='/' element={<Navigate to='/dashboard' replace />} />
							<Route path='/dashboard' element={<Home />} />
						</>
					) : (
						<>
							<Route
								path="*"
								element={
									isInstallable ? (
										<div className="flex-grow width-full max-w-md">
											<div className="w-full flex justify-center items-center mb-8">
												<Logo />
											</div>
											<div className="max-sm:px-3 ">
												<h1 className="text-center  text-3xl text-[#44475B] mb-4">
													Install AirVault Dashboard
												</h1>
												<p className="text-[#44475B] text-sm text-center max-sm:text-left mb-10">
													You are ready to use your AirVault. Install your AirVault Dashboard
													by clicking on the button below.
												</p>
												<div className="w-full flex justify-center">
													<button
														className="p-4 rounded-lg border-none outline-none bg-blue-500 text-white"
														onClick={handleInstallClick}>
														Install AirVault Dashboard
													</button>
												</div>
											</div>
										</div>
									) : (
										<div className="flex-grow width-full max-w-md max-sm:px-3">
											<div className="w-full flex justify-center items-center mb-8">
												<Logo />
											</div>
											<div>
												<h1 className="text-center text-3xl max-sm:text-left text-[#44475B] mb-4">
													App installation not available
												</h1>
												<p className="text-[#44475B]">
													This can be due to one of the following reasons:
													<ul>
														<li>Your browser does not support PWA</li>
														<li>PWA is already installed</li>
													</ul>
													Please contact support at{' '}
													<a href="mailto:backoffice@airvault.com" className="text-blue-500">
														backoffice@airvault.com
													</a>
													.
												</p>
											</div>
										</div>
									)
								}
							/>
						</>
					)}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
