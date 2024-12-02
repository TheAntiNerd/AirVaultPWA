import { useState } from 'react';
import SideMenu from '../SideMenu';
import { BackArrowIcon, DeleteIcon, EditIcon, SwitchIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import Dropdown from '../popup/DropDown';

import { useLocation, useNavigate } from 'react-router-dom';
import FrequencyPopup from '../popup/FrequencyPopup';

const NewProtection = () => {
	const users = [
		{
			date: '22 Oct,2024 at 11:45',
			size: '322 kb',
			folder_name: 'admin',
		},
		{
			date: '22 Oct,2024 at 11:45',
			size: '322 kb',
			folder_name: 'admin',
		},
		{
			date: '22 Oct,2024 at 11:45',
			size: '322 kb',
			folder_name: 'admin',
		},
		{
			date: '22 Oct,2024 at 11:45',
			size: '322 kb',
			folder_name: 'admin',
		},
	];

	const [popupType, setPopupType] = useState<string | null>(null);
	const [isHistoryOff, setIsHistoryOff] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const { usersName } = location.state || {};

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleBackClick = () => {
		navigate('/protection/on');
	};
	const handleOnToggle = (type: string) => {
		if (type === 'turnOff') {
			setIsHistoryOff(false);
			setPopupType('turnOff');
		} else if (type === 'turnOn') {
			setIsHistoryOff(true);
			setPopupType('turnOn');
		}
	};
	const handleDropdownSelect = () => {
		setPopupType('removeUser');
	};
	const handleDropdownSelects = () => {
		setPopupType('editFrequency');
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-6 max-sm:pt-2 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-6 max-sm:mb-2">
						<div className="flex items-center space-x-4 max-sm:flex-col ">
							<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3">
								<button onClick={handleBackClick} className="max-sm:absolute left-3 top-4 ">
									<BackArrowIcon />
								</button>
								<span className="max-sm:hidden ml-2">{usersName}</span>
							</h1>
						</div>

						<div className="flex items-center space-x-6">
							<Dropdown
								button={<button className="text-gray-500 hover:text-gray-700 max-sm:hidden">⋮</button>}
								onToggle={isOpen => isOpen}>
								<div className="absolute right-0 w-40 bg-white border rounded-lg flex flex-col space-y-3 px-2 shadow-md">
									{isHistoryOff ? (
										<button
											className="flex items-center mt-2 text-sm space-x-2 text-[#44475B]"
											onClick={() => handleOnToggle('turnOff')}>
											<SwitchIcon />
											<span className="text-nowrap ">Turn off history</span>
										</button>
									) : (
										<button
											className="flex items-center mt-2 space-x-2 text-sm text-[#44475B]"
											onClick={() => handleOnToggle('turnOn')}>
											<SwitchIcon />
											<span className="text-nowrap ">Turn on history</span>
										</button>
									)}
									<button
										className="flex items-center text-sm space-x-2 text-[#44475B]"
										onClick={() => handleDropdownSelects()}>
										<EditIcon />
										<span className="text-nowrap">Edit frequency</span>
									</button>
									<button
										className="flex items-center pb-2 space-x-2 text-sm text-[#44475B]  "
										onClick={() => handleDropdownSelect()}>
										<DeleteIcon />
										<span className="text-nowrap  ">Remove folder</span>
									</button>
								</div>
							</Dropdown>
						</div>
					</div>

					{/* Table and Empty State */}
					<div className=" overflow-hidden">
						<div className="overflow-hidden rounded-md border border-[#E1E3F5] max-sm:border-b">
							<table className="w-full border-collapse max-sm:overflow-hidden">
								{/* Table Header */}
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 max-sm:px-3 py-4 text-left text-sm font-semibold text-gray-600">
											<div className="flex flex-col items-start max-sm:items-start">
												Date & time
											</div>
										</th>

										<th className="px-20 max-sm:px-9 py-4 text-left text-sm font-semibold text-gray-600 ">
											<div className="flex flex-col items-start max-sm:items-end ">Size</div>
										</th>

										<th className="px-6 max-sm:px-3 py-4  text-left text-sm font-semibold text-gray-600 max-sm:hidden ">
											<div className="flex flex-col items-start max-sm:items-end max-sm:mr-16">
												Folder name
											</div>
										</th>
									</tr>
								</thead>

								<tbody>
									{users.map((user, index) => (
										<>
											<tr key={index} className="border-t">
												{/* Desktop Layout */}
												<td className="px-6 max-sm:px-3 py-4 text-[#44475B] ">
													<div className="flex flex-col items-start">
														<span className="font-regular text-nowrap">{user.date}</span>
													</div>
												</td>

												<td className="px-20 max-sm:px-3 py-4 text-gray-600 ">
													<div className="flex flex-col items-start max-sm:items-end">
														{user.size}
													</div>
												</td>

												<td className="px-6 max-sm:px-3 py-4 max-sm:hidden">
													<div className="flex flex-col items-start">
														<span className="text-gray-600 flex items-center">
															{user.folder_name}
														</span>
													</div>
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Popups */}

				{popupType === 'turnOn' && (
					<RemoveUserPopup
						onClose={handlePopupClose}
						text={'Turn on service?'}
						description={'You can turn it off later.'}
					/>
				)}
				{popupType === 'turnOff' && (
					<RemoveUserPopup
						onClose={handlePopupClose}
						text={'Turn off service?'}
						description={'You can turn it on later.'}
					/>
				)}

				{popupType === 'removeUser' && <RemoveUserPopup text={'Delete SMB?'} onClose={handlePopupClose} />}
				{popupType === 'editFrequency' && <FrequencyPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default NewProtection;
