import React, { useState } from 'react';
import CreateDeviceModal from '../Modal/RemoteShare/CreateDeviceModal';
import { Switch } from '@headlessui/react';
import { Trash } from '../svgs';
import LoadingScreen from './LoadingScreen';
import JWTDownloaded from './JWTDownloaded';
import RemoteShareListTable from './RemoteShareListTable';
import RemoveDeviceModal from '../Modal/RemoteShare/RemoveDeviceModal';

type Device = {
	name: string;
};

const RemoteShareList = () => {
	const [remoteShareListData, setRemoteShareListData] = useState<Device[]>([]);
	const [remoteShareModal, setRemoteShareModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isRemoveOpen, setIsRemoveOpen] = useState(false);
	const [showJWTDownloaded, setShowJWTDownloaded] = useState(false);
	const [deviceToRemove, setDeviceToRemove] = useState<string | null>(null);

	const addDevice = (deviceName: string) => {
		setLoading(true);
		setRemoteShareModal(false);
		setTimeout(() => {
			setRemoteShareListData(prev => [...prev, { name: deviceName }]);
			setLoading(false);
			setShowJWTDownloaded(true);
		}, 1000);
	};

	const handleJWTDownloaded = () => {
		setShowJWTDownloaded(false);
	};

	const handleStatusChange = (deviceName: string) => {
		console.log(`Status changed for: ${deviceName}`);
	};

	const handleDelete = (deviceName: string) => {
		setDeviceToRemove(deviceName);
		setIsRemoveOpen(true);
	};

	const confirmRemoveDevice = () => {
		setRemoteShareListData(prev => prev.filter(device => device.name !== deviceToRemove));
		setDeviceToRemove(null);
		setIsRemoveOpen(false);
	};

	return (
		<>
			{!loading && !showJWTDownloaded && (
				<div className="max-w-[1080px] mx-auto ">
					<div className="flex items-center pl-6 md:pl-0 justify-between">
						<div className="flex items-center gap-3">
							<h3 className="font-medium text-[#272B42] text-[30px]">Remote share</h3>
						</div>
						{remoteShareListData?.length > 0 && (
							<button
								onClick={() => setRemoteShareModal(true)}
								className="w-[161px] h-[48px] font-[500] rounded-[8px] text-white bg-[#298DFF]">
								Create device
							</button>
						)}
					</div>

					<RemoteShareListTable
						remoteShareListData={remoteShareListData}
						onStatusChange={handleStatusChange}
						onDelete={handleDelete}
					/>
					{remoteShareListData?.length < 1 && (
						<div className="flex flex-col gap-[24px] mt-[140px] justify-center text-center items-center">
							<span className="text-[#44475B]">
								No device added so far.
								<br />
								Click on the “<span className="font-medium">Create device</span>” button to add one.
							</span>
							<button
								onClick={() => setRemoteShareModal(true)}
								className="w-[161px] h-[48px] font-[500] rounded-[8px] text-white bg-[#298DFF]">
								Create device
							</button>
						</div>
					)}
				</div>
			)}
			{loading && <LoadingScreen />}
			{showJWTDownloaded && (
				<JWTDownloaded onBack={() => setShowJWTDownloaded(false)} onNext={handleJWTDownloaded} />
			)}
			<CreateDeviceModal
				setIsOpen={setRemoteShareModal}
				isOpen={remoteShareModal}
				addDevice={addDevice}
				remoteShareListData={remoteShareListData}
			/>
			<RemoveDeviceModal
				isRemoveOpen={isRemoveOpen}
				setIsRemoveOpen={setIsRemoveOpen}
				deviceToRemove={deviceToRemove}
				onConfirmRemove={confirmRemoveDevice}
			/>
		</>
	);
};

export default RemoteShareList;
