'use client';

import BallToggle from '@/components/network/BallToggle';
import axiosPost from '@/functions/axios/axiosPost';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import SMBDelete from '@/components/network/SMBDelete';
import SMBCreate from '@/components/network/SMBCreate';
import SMBEdit from '@/components/network/SMBEdit';
import SMBMenuSmall from '@/components/network/SMBMenuSmall';

export default function NetworkShare() {
	const [smbList, setSMBList] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [showPopup, setShowPopup] = useState<string>('');
	const [selectedShare, setSelectedShare] = useState<string>('');
	const [selectedSharePath, setSelectedSharePath] = useState<string>('');
	const [domain, setDomain] = useState<string>('');
	const [smbActive, setSMBActive] = useState<boolean | null>(null);
	const [showSmallMenu, setShowSmallMenu] = useState<boolean>(false);

	// function to get the domain of the page
	useEffect(() => {
		setDomain(window.location.hostname);
	}, []);

	// function to fetch list of smb shares
	async function fetchSMBShares(skipLoading: boolean = false) {
		if (!skipLoading) setLoading(true);
		try {
			const axiosRes = await axiosPost('/api/smb/list');

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				setSMBList(axiosRes?.data?.list);
			}
		} catch (error) {
		} finally {
			if (!skipLoading) setLoading(false);
		}
	}

	// function to check if SMB is active or not
	async function checkSMBStatus() {
		try {
			const axiosRes = await axiosPost('/api/smb/status');

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				setSMBActive(!!axiosRes?.data?.active);
			}
		} catch (error) {}
	}

	// function to toggle SMB service on and off
	async function handleSMBToggle() {
		setSMBActive(null);
		try {
			if (smbActive === true) {
				// turn off SMB
				const axiosRes = await axiosPost(`/api/smb/stop-smb`);

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
					toast.success(axiosRes?.data?.msg || 'SMB service stopped');
				} else {
					toast.error(axiosRes?.data?.msg || 'Failed to stop SMB service');
				}
			} else if (smbActive === false) {
				// turn on SMB
				const axiosRes = await axiosPost(`/api/smb/start-smb`);

				if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
					toast.success(axiosRes?.data?.msg || 'SMB service started');
				} else {
					toast.error(axiosRes?.data?.msg || 'Failed to start SMB service');
				}
			}
		} catch (error) {
			toast.error('Failed to toggle SMB service');
		} finally {
			checkSMBStatus();
		}
	}

	useEffect(() => {
		(async () => {
			setLoading(true);
			await Promise.allSettled([fetchSMBShares(true), checkSMBStatus()]);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			<div className="w-full h-full flex flex-col max-h-[100vh] user-select-none max-w-screen-xl mx-auto">
				<div className="top-bar flex justify-between items-center mb-2">
					<div className="left-top-bar flex justify-start items-center gap-4">
						<div className="text-2xl text-gray-500">SMB</div>
						{smbActive !== null &&
							(smbActive ? (
								<div className="p-1 px-2 rounded-full text-[#3A996D] bg-[#E0EEE8]">Active</div>
							) : (
								<div className="p-1 px-2 rounded-full text-[#737790] bg-[#E7ECF3]">Disabled</div>
							))}
					</div>
					<div className="right-top-bar flex flex-row justify-end items-center gap-2 relative">
						<button
							onClick={() => setShowPopup('add')}
							className="cta button p-3 px-4 rounded-xl bg-[#298DFF] text-white transition-all duration-300 cursor-pointer flex items-center gap-2 justify-start">
							<Plus />
							New share
						</button>
						<div
							className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
							onClick={() => setShowSmallMenu(true)}>
							<DotsVerticalIcon />
						</div>

						{showSmallMenu && smbActive !== null && (
							<SMBMenuSmall
								smbActive={smbActive}
								setShowSmallMenu={setShowSmallMenu}
								handleSMBToggle={handleSMBToggle}
							/>
						)}
					</div>
				</div>
				<div className="directory-body flex-grow flex flex-col justify-start items-start overflow-auto max-h-[calc(100vh-120px)]">
					{loading ? (
						<div className="flex items-center justify-center w-full h-screen max-h-[calc(100vh-120px)]">
							<div className="loader mb-9" />
						</div>
					) : (
						<table className="w-full rounded-xl mt-4">
							<thead>
								<tr className="bg-gray-100 rounded-xl">
									<th className="font-semibold p-6 text-left">Name</th>
									<th className="font-semibold p-6 text-left">Path</th>
									<th className="font-semibold p-6 text-left">Status</th>
								</tr>
							</thead>

							<tbody>
								{smbList?.length > 0 ? (
									smbList?.map((item: any, i: number) => (
										<tr
											key={`smb-item-${i}`}
											className="relative"
											onClick={() => {
												setSelectedShare(item?.share_name || '');
												setSelectedSharePath(item?.share_path || '');
											}}>
											<td className="p-6">
												<div className="flex flex-col justify-center items-start gap-2">
													<div className="text-gray-700">{item?.share_name || ''}</div>
													<div className="text-gray-400 text-sm">
														\\{domain}\{item?.share_name || ''}
													</div>
												</div>
											</td>
											<td className="p-6">
												<div className="flex flex-col justify-center items-start gap-2">
													<div className="text-gray-700">{`${item?.share_path || ''}`}</div>
												</div>
											</td>
											<td className="p-6 max-w-24">
												<div className="flex flex-row justify-between items-center gap-2">
													<div className="text-gray-700">
														<BallToggle
															initialState={item?.active === 1}
															share_name={item?.share_name || ''}
														/>
													</div>
													<div className="flex justify-end items-center gap-4">
														<div
															onClick={() => setShowPopup('edit')}
															className="p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-300 active:bg-blue-200">
															<Pencil />
														</div>
														<div
															className="p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all duration-300 active:bg-blue-200"
															onClick={() => setShowPopup('delete')}>
															<Trash />
														</div>
													</div>
												</div>
											</td>
										</tr>
									))
								) : (
									<>
										<tr>
											<td colSpan={3} className="p-6 h-[calc(100vh-250px)] text-center">
												<div className="flex flex-col items-center justify-center h-full">
													<div className="text-gray-500 text-lg">No directories found</div>
													<div className="text-lg text-gray-500 mt-2">
														Click on the{' "'}
														<span className="font-semibold text-gray-900">+ New share</span>
														{'" '}
														button to get started
													</div>
													<div className="text-center">
														<button
															className="mt-4 cta button p-3 px-4 rounded-xl bg-[#298DFF] text-white transition-all duration-300 cursor-pointer flex items-center gap-2 justify-start"
															onClick={() => setShowPopup('add')}>
															<Plus />
															<div>New share</div>
														</button>
													</div>
												</div>
											</td>
										</tr>
									</>
								)}
							</tbody>
						</table>
					)}

					{showPopup === 'delete' && (
						<SMBDelete
							setShowPopup={setShowPopup}
							share_name={selectedShare}
							fetchContents={fetchSMBShares}
						/>
					)}
					{showPopup === 'add' && <SMBCreate setShowPopup={setShowPopup} fetchContents={fetchSMBShares} />}
					{showPopup === 'edit' && (
						<SMBEdit
							setShowPopup={setShowPopup}
							fetchContents={fetchSMBShares}
							initialShareName={selectedShare}
							initialCumbs={
								selectedSharePath
									?.split('/')
									?.map(n => n?.trim())
									?.filter(n => !!n && n !== '.') || []
							}
						/>
					)}
				</div>
			</div>
		</>
	);
}
