/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import PreventBackNavigation from './components/navigation/PreventBackNavigation.tsx';
import { registerSW } from 'virtual:pwa-register';
import UpdateNotification from './UpdateNotification';
import { useState } from 'react';
import Modal from './Modal';
//old code without state

// if ('serviceWorker' in navigator) {
//      registerSW({
//              immediate: true,
//              // onRegistered(r: any) {
//              //      console.log('onRegistered', r);

//              //      r.onupdatefound = () => {
//              //              if (confirm('Update available. Reload?')) {
//              //                      window.location.reload();
//              //              }
//              //              console.log('onupdatefound', r);
//              //      };

//              // },
//              onRegistered(registration: ServiceWorkerRegistration | undefined) {
//                      let checkInterval: number | undefined;
//                      let userDismissedUpdate = false;

//                      const createUpdateButton = () => {
//                              const button = document.createElement('button');
//                              button.innerHTML = 'Update Available';
//                              button.style.cssText = `
//                                      position: fixed;
//                                      top: 20px;
//                                      right: 20px;
//                                      z-index: 9999;
//                                      padding: 10px 20px;
//                                      background-color: #007bff;
//                                      color: white;
//                                      border: none;
//                                      border-radius: 5px;
//                                      cursor: pointer;
//                                      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
//                              `;

//                              button.addEventListener('click', () => {
//                                      window.location.reload();
//                              });

//                              document.body.appendChild(button);
//                              return button;
//                      };

//                      const checkForUpdates = async () => {
//                              if (userDismissedUpdate) {
//                                      clearInterval(checkInterval);
//                                      return;
//                              }

//                              try {
//                                      if (registration) await registration.update();
//                              } catch (err) {
//                                      console.error('Update check failed:', err);
//                              }
//                      };

//                      if (registration) {
//                              registration.onupdatefound = () => {
//                                      const userWantsUpdate = confirm('Update available. Would you like to update the app?');

//                                      if (userWantsUpdate) {
//                                              window.location.reload();
//                                      } else {
//                                              userDismissedUpdate = true;
//                                              clearInterval(checkInterval);
//                                              createUpdateButton();
//                                      }
//                              };

//                              // Check for updates every 10 seconds
//                              checkInterval = setInterval(checkForUpdates, 10000);
//                      }
//              },
//      });
// }

// createRoot(document.getElementById('root')!).render(
//      <StrictMode>
//              <>
//                      <App />
//                      <PreventBackNavigation />
//              </>
//      </StrictMode>
// );

// code with state to check for updates here
function useServiceWorker() {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [showModal, setShowModal] = useState(false);

	if ('serviceWorker' in navigator) {
		registerSW({
			immediate: true,
			onRegistered(registration: ServiceWorkerRegistration | undefined) {
				let checkInterval: number | undefined;
				let userDismissedUpdate = false;

				const checkForUpdates = async () => {
					if (userDismissedUpdate) {
						clearInterval(checkInterval);
						return;
					}

					try {
						if (registration) await registration.update();
					} catch (err) {
						console.error('Update check failed:', err);
					}
				};

				if (registration) {
					registration.onupdatefound = () => {
						const installingWorker = registration.installing;

						if (installingWorker) {
							installingWorker.onstatechange = () => {
								if (installingWorker.state === 'installed') {
									if (navigator.serviceWorker.controller) {
										setShowModal(true);
									} else {
										console.log('This is first time install');
									}
								}
							};
						}
					};

					// Check for updates every 10 seconds
					checkInterval = setInterval(checkForUpdates, 5000);
				}
			},
		});
	}

	return { updateAvailable, showModal, setShowModal, setUpdateAvailable };
}

function Root() {
	const { updateAvailable, showModal, setShowModal, setUpdateAvailable } = useServiceWorker();

	const handleUpdate = () => {
		window.location.reload();
	};

	const handleModalConfirm = () => {
		setShowModal(false);
		handleUpdate();
	};

	const handleModalCancel = () => {
		setShowModal(false);
		setUpdateAvailable(true); // Show the update notification button
	};

	return (
		<StrictMode>
			<>
				<App />
				<PreventBackNavigation />

				{updateAvailable && <UpdateNotification onUpdate={handleUpdate} />}
				<Modal isOpen={showModal} onConfirm={handleModalConfirm} onCancel={handleModalCancel} />
			</>
		</StrictMode>
	);
}

createRoot(document.getElementById('root')!).render(<Root />);
