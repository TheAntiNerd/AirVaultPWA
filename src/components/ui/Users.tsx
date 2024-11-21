import { useState } from 'react';
import SideMenu from '../SideMenu';
import RemoveIcon from '../../assets/svg/removeuser.svg';
import EditIcon from '../../assets/svg/edituser.svg';
import UserSettingIcon from '../../assets/svg/usersettings.svg';
import ResetPasswordPopup from '../popup/ResetPasswordPopup';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import EditUserPopup from '../popup/EditUserPopup';
import UserSettingsPopup from '../popup/UserSettingsPopup';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../popup/DropDown';

const UsersCreate = () => {
	const users = [
		{ name: 'Rituraj', username: 'ritu0024', password: '************', status: 'Pending', role: 'Admin' },
		{
			name: 'Rituraj Phukan',
			username: 'ritzphukan00031',
			password: '************',
			status: 'Pending',
			role: 'Moderator',
		},
		{
			name: 'Bishal Bhatt',
			username: 'bishalbhattacharyya20',
			password: '************',
			status: 'Accepted',
			role: 'Admin',
		},
		{
			name: 'Roy Dishant',
			username: 'roydishant1092',
			password: '************',
			status: 'Accepted',
			role: 'Default',
		},
		{
			name: 'Ashutosh Mishra',
			username: 'ashking99996',
			password: '************',
			status: 'Rejected',
			role: 'Default',
		},
	];

	const loggedInUser = { username: 'Rituraj', role: 'Admin' }; //dummy

	const [popupType, setPopupType] = useState<string | null>(null);
	const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
	const navigate = useNavigate();

	const getStatusClasses = (status: string) => {
		switch (status) {
			case 'Pending':
				return 'bg-gray-100 text-gray-600';
			case 'Accepted':
				return 'bg-green-100 text-green-600';
			case 'Rejected':
				return 'bg-red-100 text-red-600';
			default:
				return '';
		}
	};

	const handlePopupClose = () => {
		setPopupType(null);
		setSelectedUserIndex(null);
	};

	const handleAddUserClick = () => {
		navigate('/users/new'); // Navigates to the /new route
	};

	const handleDropdownSelect = (option: string, userIndex: number) => {
		setSelectedUserIndex(userIndex); // Set selected user index
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'Edit User' ? 'editUser' : 'userSettings');
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] h-screen pt-6 px-3 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-medium text-gray-800">Users</h1>
						<button
							className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
							onClick={handleAddUserClick}>
							Add user
						</button>
					</div>

					{/* Table */}
					<div className="w-full h-[calc(100%-80px)] overflow-y-auto">
						<div className="overflow-hidden rounded-md border border-[#E1E3F5]">
							<table className="w-full border-collapse">
								{/* Table Header */}
								<thead className="bg-gray-50">
									<tr>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600">
											Name
										</th>
										<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
											Username
										</th>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600">
											Password
										</th>
										<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600">
											Webrole
										</th>
										<th className="px-6 py-6 text-center text-sm font-semibold text-gray-600"></th>
									</tr>
								</thead>

								{/* Table Body */}
								<tbody>
									{users.map((user, index) => (
										<tr key={index} className="border-t">
											<td className="px-6 py-6 text-[#44475B]">
												<div className="flex flex-col items-start">
													<span className="font-regular">{user.name}</span>
													<span
														className={`mt-1 text-xs px-2 py-1 rounded-full ${getStatusClasses(
															user.status
														)}`}>
														{user.status}
													</span>
												</div>
											</td>
											<td className="px-6 py-6 text-gray-600">{user.username}</td>
											<td className="px-6 py-4">
												<div className="flex flex-col items-start">
													<span className="text-gray-600">{user.password}</span>
													<a
														className="mt-1 text-blue-500 hover:underline text-sm cursor-pointer"
														onClick={() => {
															setPopupType('resetPassword');
															setSelectedUserIndex(index);
														}}>
														Reset password
													</a>
												</div>
											</td>
											<td className="px-6 py-6 text-gray-600">{user.role}</td>
											<td className="px-4 py-6 text-center">
												{/* Replace with Dropdown Component */}
												<Dropdown
													button={
														<button className="text-gray-500 hover:text-gray-700">⋮</button>
													}
													onToggle={isOpen => isOpen && setSelectedUserIndex(index)}>
													<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-2xl rounded-lg w-40 h-32">
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Remove User', index)}>
															<span className="mr-3">
																<RemoveIcon />
															</span>
															Remove User
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Edit User', index)}>
															<span className="mr-3">
																<EditIcon />
															</span>
															Edit User
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() =>
																handleDropdownSelect('User settings', index)
															}>
															<span className="mr-3">
																<UserSettingIcon />
															</span>
															User settings
														</li>
													</ul>
												</Dropdown>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* Popups */}
				{popupType === 'resetPassword' && selectedUserIndex !== null && (
					<ResetPasswordPopup
						onClose={handlePopupClose}
						userRole={loggedInUser.role as 'Owner' | 'Admin' | 'Moderator' | 'Default'}
						targetUserRole={users[selectedUserIndex].role as 'Owner' | 'Admin' | 'Moderator' | 'Default'}
						isOwnPasswordReset={users[selectedUserIndex].username === loggedInUser.username}
					/>
				)}

				{popupType === 'removeUser' && <RemoveUserPopup onClose={handlePopupClose} />}
				{popupType === 'editUser' && <EditUserPopup onClose={handlePopupClose} />}
				{popupType === 'userSettings' && <UserSettingsPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default UsersCreate;
