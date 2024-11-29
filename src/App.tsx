import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoaderFull from './components/wait/LoaderFull';
import Logo from './assets/logo.svg';
import VersionUpdate from './components/ui/VersionUpdate';
import Directory from './components/ui/Directory';
import NetworkShares from './components/ui/NetworkShares';
import Protection from './components/ui/Protection';
import Dashboard from './components/ui/Dashboard';
import Users from './components/ui/Users';
import Groups from './components/ui/Groups';
import NewUser from './components/ui/NewUser';
import NewGroup from './components/ui/NewGroup';
import NewVersion from './components/ui/NewVersion';
import NewProtection from './components/ui/NewProtection';
import TurnOnProtection from './components/ui/TurnOnProtection';

// Function to check if PWA is already installed
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
		}, 3000);

		// Listen for the beforeinstallprompt event
		const handleBeforeInstallPrompt = (e: Event) => {
			clearTimeout(timer);
			setLoading(false);
			e.preventDefault();
			setDeferredPrompt(e);
			setIsInstallable(true);
		};

		// Check if PWA is already installed
		if (isPWAInstalled()) {
			console.log('PWA already installed');
			setIsAlreadyInstalled(true);
			clearTimeout(timer);
			setLoading(false);
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.addEventListener('appinstalled', () => {
			setIsAlreadyInstalled(true);
			clearTimeout(timer);
			setLoading(false);
		});

		return () => {
			clearTimeout(timer);
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	const handleInstallClick = async () => {
		if (deferredPrompt && 'prompt' in deferredPrompt) {
			const promptEvent = deferredPrompt as any;
			promptEvent.prompt();
			const { outcome } = await promptEvent.userChoice;
			if (outcome === 'accepted') {
				console.log('PWA installed');
			} else {
				console.log('PWA installation rejected');
			}
			setDeferredPrompt(null);
			setIsInstallable(false);
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
							<Route path="/" element={<Navigate to="/dashboard" replace />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/directories" element={<Directory />} />
							<Route path="/network-shares" element={<NetworkShares />} />
							<Route path="/protection" element={<TurnOnProtection />} />
							<Route path="/protection/On" element={<Protection />} />
							<Route path="/protection/new" element={<NewProtection />} />
							<Route path="/updates" element={<VersionUpdate />} />
							<Route path="/updates/new" element={<NewVersion />} />
							<Route path="/users" element={<Users />} />
							<Route path="/users/new" element={<NewUser />} /> {/* new users */}
							<Route path="/groups" element={<Groups />} />
							<Route path="/groups/new" element={<NewGroup />} />
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
											<div>
												<h1 className="text-center text-4xl text-gray-500 mb-4">
													Install AirVault Dashboard
												</h1>
												<p className="text-gray-500 text-center mb-4">
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
										<div className="flex-grow width-full max-w-md">
											<div className="w-full flex justify-center items-center mb-8">
												<Logo />
											</div>
											<div>
												<h1 className="text-center text-4xl text-gray-500 mb-4">
													App installation not available
												</h1>
												<p className="text-gray-500">
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
