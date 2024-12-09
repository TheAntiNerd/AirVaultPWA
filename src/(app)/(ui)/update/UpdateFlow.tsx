'use client';
import React, { useState, useEffect } from 'react';
import Checking from '@/components/updateFlow/Checking';
import Installing from '@/components/updateFlow/Installing';
import Processing from '@/components/updateFlow/Processing';
import Updated from '@/components/updateFlow/Updated';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';

type Props = {
	initialStep: number;
	currentVersion: string;
};

const UpdateFlow = ({ initialStep, currentVersion }: Props) => {
	const [step, setStep] = useState(initialStep);
	const [loading, setLoading] = useState(true); ////////
	const [newVersionDetails, setNewVersionDetails] = useState<any>(null);

	useEffect(() => {
		setStep(initialStep);
	}, [initialStep]);

	const goToNextStep = () => {
		setStep(step + 1);
	};

	const goToPreviousStep = () => {
		setStep(step - 1);
	};

	// check if an update is available
	async function checkForUpdates() {
		setLoading(true);
		try {
			const axiosRes = await axiosPost(`/api/update/check`, {});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				if (axiosRes?.data?.details) {
					if (initialStep !== 2 && currentVersion !== axiosRes?.data?.details?.version) setStep(1);
					setNewVersionDetails(axiosRes?.data?.details);
				}
			}
		} catch (error) {
			toast.error('Could not check for updates!');
		}

		setLoading(false);
	}

	// function to download updates
	async function downloadUpdates(version: string) {
		// request the backend to download the update
		const axiosRes = await axiosPost('/api/update/download', {
			version: version || '',
		});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success(axiosRes?.data?.msg || 'Update downloaded successfully!');
			setStep(2);
		} else {
			toast.error(axiosRes?.data?.msg || 'Failed to download update!');
		}
	}

	// function to clear the downloaded update
	async function clearDownloadedUpdate() {
		try {
			const axiosRes = await axiosPost('/api/update/clear', {});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				toast.success(axiosRes?.data?.msg || 'Downloaded update cleared successfully!');
				setStep(1);
				checkForUpdates();
			} else {
				toast.error(axiosRes?.data?.msg || 'Failed to clear downloaded update!');
			}
		} catch (error) {
			toast.error('Failed to clear downloaded update!');
		}
	}

	// function to install updates
	async function installUpdates() {
		setStep(3); // show the processing page

		// request the backend to install the update
		const axiosRes = await axiosPost('/api/update/install', {});

		if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
			toast.success(axiosRes?.data?.msg || 'Update installed successfully!');
			setStep(4); // show the updated page
		} else {
			toast.error(axiosRes?.data?.msg || 'Failed to install update!');
		}
	}

	useEffect(() => {
		checkForUpdates();
	}, []);
	return (
		<>
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<div className="loader mb-9" />
				</div>
			) : (
				<div>
					{step === 1 && (
						<Checking
							onNext={goToNextStep}
							onBack={goToPreviousStep}
							newVersionDetails={newVersionDetails}
							downloadUpdates={downloadUpdates}
						/>
					)}
					{step === 2 && (
						<Installing
							onNext={goToNextStep}
							onBack={goToPreviousStep}
							newVersionDetails={newVersionDetails}
							clearDownloadedUpdate={clearDownloadedUpdate}
							installUpdates={installUpdates}
						/>
					)}
					{step === 3 && <Processing onNext={goToNextStep} onBack={goToPreviousStep} />}
					{step === 4 && <Updated currentVersion={currentVersion} checkForUpdates={checkForUpdates} />}
				</div>
			)}
		</>
	);
};

export default UpdateFlow;
