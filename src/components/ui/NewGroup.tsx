import { useState } from 'react';
import SideMenu from '../SideMenu';
import { RemoveIcon, EditIcon, SearchIcon, DownArrow, BackArrowIcon, DeleteIcon } from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../popup/DropDown';
import AddMemberPopup from '../popup/AddMemberPopup';
import RolePopup from '../popup/RolePopup';

const NewGroup = () => {
	const users = [
		{ name: 'Rituraj', role: 'Admin' },
		{
			name: 'Rituraj Phukan',
			role: 'Moderator',
		},
		{
			name: 'Bishal Bhatt',
			role: 'Admin',
		},
		{
			name: 'Roy Dishant',
			role: 'Default',
		},
		{
			name: 'Ashutosh Mishra',
			role: 'Default',
		},
	];
	const location = useLocation();
	const { groupName } = location.state || {};
	const [popupType, setPopupType] = useState<string | null>(null);
	const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
	const navigate = useNavigate();

	const toggleDropdown = (index: number) => {
		setOpenRowIndex(prevIndex => (prevIndex === index ? null : index));
	};

	const handleBackClick = () => {
		navigate('/groups');
	};

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleAddUserClick = () => {
		setPopupType('AddMember');
	};

	const handleDropdownSelect = (option: string) => {
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'Edit User' ? 'editUser' : 'userSettings');
	};

	return (
		<SideMenu>
			<div className="flex justify-center items-start min-h-screen">
				<div className="w-[1200px] max-sm:w-full h-screen pt-10 px-3 max-sm:px-0 bg-white text-sans">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3 ">
							<button
								onClick={handleBackClick}
								className=" max-sm:absolute mr-2 max-sm:top-0 max-sm:left-0 bg-white rounded-md text-sm text-[#44475B] focus:outline-none ">
								<span className="inline max-sm:hidden">
									<BackArrowIcon />
								</span>
							</button>
							{groupName} {/* from navigate state */}
						</h1>{' '}
						{/* this will change dynamically */}
						{users.length > 0 && (
							<button
								className={`max-sm:hidden shadow shadow-gray-500/30 bg-[#298DFF] text-white px-5  py-3 rounded-md`}
								onClick={handleAddUserClick}>
								Add Member
							</button>
						)}
					</div>

					{/* Search bar in mobile */}
					<div className="hidden max-sm:block  max-sm:w-full mb-4 max-sm:px-3">
						<div className="relative flex items-center">
							{/* Search Icon */}
							<span className="absolute left-2 text-[#9AA1B7]">
								<SearchIcon />
							</span>

							{/* Search Input */}
							<input
								type="input"
								className="border focus:border-blue-500 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
								placeholder="Search"
							/>
						</div>
					</div>

					{/* Table and Empty State */}
					<div className="overflow-visible">
						<div className="rounded-md max-sm:rounded-none border border-[#E1E3F5] max-sm:border-b">
							<table className="w-full border-collapse max-sm:overflow-hidden">
								{/* Table Header */}
								<thead className="bg-gray-50">
									<tr>
										<div className="max-sm:flex max-sm:justify-between">
											<th className="px-6 max-sm:flex max-sm:items-start max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600">
												Name
											</th>
											<th className="hidden max-sm:flex max-sm:justify-end py-6 max-sm:pr-20 text-sm font-semibold text-gray-600">
												Webrole
											</th>
										</div>
										<th className="max-sm:hidden px-6 max-sm:items-start max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600"></th>
										<th className="ml-auto items-end max-sm:hidden px-6 py-6 text-sm font-semibold text-gray-600">
											<div className="flex flex-col items-start">Webrole</div>
										</th>
										<th className="max-sm:hidden px-6 max-sm:items-start max-sm:px-3 py-6 text-left text-sm font-semibold text-gray-600"></th>
									</tr>
								</thead>

								{/* Table Body */}
								<tbody>
									{users.map((user, index) => (
										<tr
											key={index}
											className="border-t max-sm:border-[#E1E3F5] max-sm:mb-4 max-sm:rounded-lg cursor-pointer"
											onClick={() => toggleDropdown(index)}>
											{/* Desktop Layout */}
											<td className="px-6 py-6 text-[#44475B] max-sm:hidden">
												<div className="flex flex-col items-start">
													<span className="font-regular">{user.name}</span>
												</div>
											</td>
											<td className="px-6 py-6 text-gray-600 max-sm:hidden"></td>
											<td className="px-6 py-6 text-gray-600 max-sm:hidden">
												<div className="flex flex-col items-start">{user.role}</div>
											</td>

											<td className="px-4 py-6 text-center max-sm:hidden">
												<Dropdown
													button={
														<button className="text-gray-500 hover:text-gray-700">
															<div className="flex flex-col items-end">⋮</div>
														</button>
													}
													onToggle={isOpen => isOpen}>
													<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-2xl rounded-lg w-40 h-24">
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Remove User')}>
															<span className="mr-3">
																<RemoveIcon />
															</span>
															Remove
														</li>
														<li
															className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
															onClick={() => handleDropdownSelect('Edit User')}>
															<span className="mr-3">
																<EditIcon />
															</span>
															Change Role
														</li>
													</ul>
												</Dropdown>
											</td>

											{/* Mobile Layout */}
											<td className="hidden max-sm:block">
												<div className="py-4 px-3 w-full flex items-center">
													<span className="text-[#44475B] text-nowrap">{user.name}</span>
													<div className="flex items-center space-x-9 ml-auto">
														<span className="text-[#44475B] text-sm text-nowrap">
															{user.role}
														</span>
														<button
															className={`transform transition-transform duration-300 ease-in-out ${openRowIndex === index ? 'rotate-180' : ''
																} text-gray-500 hover:text-gray-700`}>
															<DownArrow />
														</button>
													</div>
												</div>

												{/* Expanded View */}
												{openRowIndex === index && (
													<div className="px-3 py-2 text-sm text-[#44475B] font-light">
														<div className="flex items-center justify-center space-x-16 mt-6 w-full mb-3">
															<button
																className="flex flex-col items-center gap-3 text-[#44475B]"
																onClick={() => handleDropdownSelect('Remove User')}>
																<div>
																	<DeleteIcon />
																</div>
																<span className="text-xs">Remove user</span>
															</button>
															<button
																className="flex flex-col items-center gap-3 text-[#44475B]"
																onClick={() => handleDropdownSelect('Edit User')}>
																<div>
																	<EditIcon />
																</div>
																<span className="text-xs">Change Role</span>
															</button>
														</div>
													</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="max-sm:px-3 fixed bottom-10 w-full z-10">
							{users.length > 0 && (
								<button
									className="max-sm:block shadow shadow-gray-500/30 hidden max-sm:w-full py-3 bg-[#298DFF] text-white rounded-md"
									onClick={handleAddUserClick}
								>
									Add Member
								</button>
							)}
						</div>


						{/* Empty State */}
						{users.length === 0 && (
							<div className="flex flex-col items-center justify-center mt-24 text-center max-sm:px-3 max-sm:relative">
								<p className="text-[#44475B] mb-1">No users added so far.</p>
								<p className="text-[#44475B] mb-6">
									Click on the <span className="font-bold">“Add member”</span> button to build your
									team.
								</p>
								<button
									className={`px-3 max-sm:block shadow shadow-gray-500/30 max-sm:w-full max-sm:mt-28 py-3 bg-[#298DFF] text-white rounded-md`}
									onClick={handleAddUserClick}>
									Add Member
								</button>
							</div>
						)}
					</div>
				</div>
				{/* back button */}
				<button
					onClick={handleBackClick}
					className=" max-sm:absolute max-sm:top-[68px] max-sm:left-3 bg-white rounded-md text-sm text-[#44475B] focus:outline-none ">
					<span className="hidden max-sm:inline ">
						<BackArrowIcon />
					</span>
				</button>
				{/* Popups */}

				{popupType === 'removeUser' && <RemoveUserPopup onClose={handlePopupClose} />}
				{popupType === 'editUser' && <RolePopup onClose={handlePopupClose} />}
				{popupType === 'AddMember' && <AddMemberPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default NewGroup;
