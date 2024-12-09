'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname for route detection
import Start1 from '@/components/setupFlow/Start1';
import VaultName2 from '@/components/setupFlow/VaultName2';
import SetupMode3 from '@/components/setupFlow/SetupMode3';
import SelectDiskPage from '@/components/setupFlow/SelectDisk3a';
import ProtectionType3b from '@/components/setupFlow/ProtectionType3b';
import ManualProtection3ba from '@/components/setupFlow/ManualProtection3ba';
import Warning4 from '@/components/setupFlow/Warning4';
import Processing5 from '@/components/setupFlow/Processing5';
import axiosPost from '@/functions/axios/axiosPost';
import toast from 'react-hot-toast';

export type DiskDetails = {
	device: string;
	boot_drive: boolean;
	disk_type: string;
	size: number;
	sector_size: number;
	dev_links: string;
	serial: string;
	disk_seq: number;
	bus: string;
	vendor: string;
	model: string;
	device_is_integrity_capable: boolean;
};

const SetupFlow = () => {
	const [step, setStep] = useState(1);
	const [diskCount, setDiskCount] = useState(0);
	const [selectedDiskList, setSelectedDiskList] = useState<any[]>([]);
	const [mRaidType, setMRaidType] = useState('');
	const [raidType, setRaidType] = useState('');
	const [warningBack, setWarningBack] = useState('');
	const [name, setName] = useState('');

	const pathname = usePathname(); // Detect route changes

	// Clear local storage on route change or page reload
	useEffect(() => {
		const handleBeforeUnload = () => {
			localStorage.clear();
		};

		// Clear local storage when route changes
		localStorage.clear();

		// Clear local storage on page reload or navigation away
		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [pathname]);

	const goToNextStep = () => {
		setStep(step + 1);
	};

	const goToPreviousStep = () => {
		setStep(step - 1);
	};

	const handleManualSetup = () => {
		console.log('Proceeding to manual setup');
		setWarningBack('express');
		setStep(7);
	};

	const handleSelectMode = (Name: string) => {
		setName(Name);
		console.log('Name saved:', Name);
		setStep(3);
	};

	const handleSelectDisksNext = (selectedDiskCount: number) => {
		console.log('Selected disks count:', selectedDiskCount);
		setDiskCount(selectedDiskCount);
		setStep(5);
	};

	const handleManaulRaidType = (raidType: 'RAID0' | 'RAID1' | 'LINEAR' | 'RAID4' | 'RAID5' | 'RAID6' | 'RAID10') => {
		setMRaidType(raidType);
		console.log(raidType);
		setWarningBack('manual');
		setStep(7);
	};

	const handleProtectionTypeNext = (ProtectionType: 'RX1' | 'RX2' | 'Manual') => {
		setRaidType(ProtectionType);
		console.log('Selected protection type:', ProtectionType);
		if (ProtectionType === 'RX1' || ProtectionType === 'RX2') {
			setWarningBack('RX');
			setStep(7);
		} else {
			setStep(6);
		}
	};

	const handleManualWarning = () => {
		console.log(warningBack);
		if (warningBack === 'express') {
			setStep(3);
		} else if (warningBack === 'manual') {
			setStep(6);
		} else if (warningBack === 'RX') {
			setStep(5);
		} else {
			setStep(6);
		}
	};

	// on the final step, send the data to the server
	useEffect(() => {
		if (step === 8) {
			(async () => {
				// send the request to the server to initialize the vault
				const axiosRes = await axiosPost('/api/setup/initialize', {
					name,
					diskList: selectedDiskList,
				});

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success) {
					// redirect to the pools page
					window.location.href = '/pools';
				} else {
					// throw error and reload the page
					toast.error(axiosRes?.data?.msg || 'Failed to initialize vault!');
					window.location.reload();
				}
			})();
		}
	}, [step]);

	return (
		<div>
			{step === 1 && <Start1 onNext={goToNextStep} />}
			{step === 2 && <VaultName2 onBack={goToPreviousStep} onNext={handleSelectMode} name={name} />}
			{step === 3 && (
				<SetupMode3 onBack={goToPreviousStep} onNext={goToNextStep} onManualSetup={handleManualSetup} />
			)}
			{step === 4 && (
				<SelectDiskPage
					onBack={goToPreviousStep}
					onNext={handleManualSetup}
					setSelectedDiskList={setSelectedDiskList}
				/>
			)}
			{step === 5 && (
				<ProtectionType3b diskCount={diskCount} onBack={goToPreviousStep} onNext={handleProtectionTypeNext} />
			)}
			{step === 6 && (
				<ManualProtection3ba diskCount={diskCount} onBack={goToPreviousStep} onNext={handleManaulRaidType} />
			)}
			{step === 7 && <Warning4 onBack={() => setStep(4)} onNext={goToNextStep} RaidType={''} />}
			{step === 8 && <Processing5 />}
		</div>
	);
};

export default SetupFlow;
