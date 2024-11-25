import { useState } from 'react';
import SideMenu from '../SideMenu';
import {
	EditIcon,
	SearchIcon,
	DownArrow,
	DeleteIcon,
	CollabIcon,
	GroupsIcon,
	DetailsIcon,
	DirectoryIcon,
	AddDirectory,
} from '../../assets/svg';
import RemoveUserPopup from '../popup/RemoveUserPopup';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../popup/DropDown';
import CreateGroupPopup from '../popup/CreateGroupPopup';
import AddMemberPopup from '../popup/AddMemberPopup';
import GroupsPopup from '../popup/GroupsPopup';

const Directory = () => {
	const users = [
		{
			name: 'Admin',
			members: '20',
			date: '22/12/2023 at 11:45',
		},
		{
			name: 'Moderators',
			members: '52',
			date: '20/12/2023 at 12:35',
		},

		{
			name: 'Freelancers',
			members: '60',
			date: '23/11/2024 at 12:00',
		},
		{
			name: 'Editors',
			members: '65',
			date: '23/11/2024 at 12:00',
		},
	];

	const [popupType, setPopupType] = useState<string | null>(null);
	const [showSidebar, setShowSidebar] = useState(false);
	const [selectedUser, setSelectedUser] = useState<number | null>(null);

	const navigate = useNavigate();

	const handlePopupClose = () => {
		setPopupType(null);
	};

	const handleDetailsClick = (index: number) => {
		setSelectedUser(index); // Save the selected user index
		setShowSidebar(true); // Show the sidebar
		setPopupType(null);
	};

	const handleSidebarClose = () => {
		setShowSidebar(false);
	};

	const handleAddUserClick = () => {
		setPopupType('addGroup');
	};
	const handleAddGroupClick = () => {
		setPopupType('groups');
	};
	const handleDropdownSelect = (option: string, userIndex: number) => {
		setPopupType(option === 'Remove User' ? 'removeUser' : option === 'collabs' ? 'collabarators' : 'addGroup');
	};

	const handleGroupClick = (index: number) => {
		navigate('/groups/new', { state: { groupName: users[index]?.name } });
	};

	return (
		<SideMenu>
			<div className="flex flex-col lg:flex-row w-full min-h-screen bg-white text-sans">
				<div className="flex justify-center items-start min-h-screen">
					<div className="w-[1200px] max-sm:w-full h-screen pt-6 px-3 max-sm:px-0 bg-white text-sans">
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h1 className="text-3xl font-medium text-gray-800 max-sm:px-3">Directories</h1>

							{users.length > 0 && (
								<button
									className={` px-3 ml-3 mr-3 max-sm:hidden bottom-0 left-0 right-0 max-sm:mb-4  py-2 border-2 border-[#E1E3F5] bg-white text-[#298DFF] font-medium rounded-md`}
									onClick={handleAddUserClick}>
									<span className="inline-block align-middle">
										<span className="inline-block align-middle mr-2 -mt-1">
											<AddDirectory />
										</span>
										New directory
									</span>
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
									type="search"
									className="border-2 border-[#C4C7E3] rounded-md w-full pl-10 py-2 text-[#9AA1B7] focus:outline-none"
									placeholder="Search"
								/>
							</div>
						</div>

						{/* Table and Empty State */}
						<div className=" overflow-hidden">
							<div className="overflow-hidden rounded-md border border-[#E1E3F5] max-sm:border-b">
								<table className="w-full border-collapse max-sm:overflow-hidden">
									{/* Table Header */}
									<thead className="bg-gray-50">
										<tr>
											<div className="max-sm:flex max-sm:justify-between">
												<th className="px-6 max-sm:px-3 py-4 text-left text-sm font-semibold text-gray-600">
													Name
												</th>
												<th className=" hidden max-sm:flex max-sm:justify-end py-4 max-sm:pr-16 mr-2  text-sm font-semibold text-gray-600">
													Members
												</th>
											</div>
											<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 max-sm:hidden">
												<div className="flex flex-col items-end">Members</div>
											</th>

											<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden ">
												<div className="flex flex-col items-end pr-16">Created on</div>
											</th>
											<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden "></th>
											<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-sm:hidden "></th>
										</tr>
									</thead>

									<tbody>
										{users.map((user, index) => (
											<tr
												key={index}
												className="border-t max-sm:border-[#E1E3F5] max-sm:mb-4  max-sm:rounded-lg">
												{/* Desktop Layout */}
												<td className="px-6 py-6 text-[#44475B] max-sm:hidden">
													<div className="flex flex-col items-start">
														<span className="font-regular">{user.name}</span>
														<span className="mt-1 text-xs px-2 py-1 rounded-full"></span>
													</div>
												</td>

												<td className="px-2 pl-20 py-6 text-gray-600 max-sm:hidden">
													<div className="flex flex-col items-center">{user.members}</div>
												</td>

												<td className="px-6  py-4 max-sm:hidden">
													<div className="flex flex-col items-end">
														<span className="text-gray-600">{user.date}</span>
													</div>
												</td>
												<td className="px-6 py-6 text-gray-600 max-sm:hidden">
													<span
														onClick={() => handleGroupClick(index)}
														className="flex flex-col items-center -rotate-90">
														<DownArrow />
													</span>
												</td>
												<td className="px-4 py-6 text-center max-sm:hidden">
													<Dropdown
														button={
															<button className="text-gray-500 hover:text-gray-700">
																⋮
															</button>
														}
														onToggle={isOpen => isOpen}>
														<ul className="py-2 text-sm text-left text-[#44475B] absolute right-5 bg-white shadow-2xl rounded-lg w-48 h-56">
															<li
																className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																onClick={() =>
																	handleDropdownSelect('Edit User', index)
																}>
																<span className="mr-3">
																	<EditIcon />
																</span>
																Rename
															</li>
															<li
																className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																onClick={() => handleDropdownSelect('collabs', index)}>
																<span className="mr-3">
																	<CollabIcon />
																</span>
																Collabarators
															</li>
															<li
																className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																onClick={handleAddGroupClick}>
																<span className="mr-3">
																	<GroupsIcon />
																</span>
																Groups
															</li>
															<li
																className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																onClick={() => {
																	handleDetailsClick(index);
																}}>
																<span className="mr-3">
																	<DetailsIcon />
																</span>
																Details
															</li>
															<li
																className="flex items-center px-4 py-2 hover:bg-[#DBEAFE] cursor-pointer rounded-sm"
																onClick={() =>
																	handleDropdownSelect('Remove User', index)
																}>
																<span className="mr-3">
																	<DeleteIcon />
																</span>
																Delete directory
															</li>
														</ul>
													</Dropdown>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="max-sm:px-3 max-sm:mb-5">
								{users.length > 0 && (
									<button
										className={`hidden max-sm:block px-3 ml-3 mr-3 max-sm:fixed bottom-0 left-0 right-0 max-sm:mb-4  py-2 border-2 border-[#E1E3F5] bg-white text-[#298DFF] font-medium rounded-md`}
										onClick={handleAddUserClick}>
										<span className="inline-block align-middle">
											<span className="inline-block align-middle mr-2 -mt-1">
												<AddDirectory />
											</span>
											New directory
										</span>
									</button>
								)}
							</div>

							{/* Empty State */}
							{users.length === 0 && (
								<div className="flex flex-col items-center justify-center mt-48 text-center max-sm:px-3 max-sm:relative">
									<p className=" text-[#44475B] mb-1">No directories created so far.</p>
									<p className="text-[#44475B] mb-6">
										Click on the <span className="font-bold">“Add directory”</span> button to create
										one.
									</p>
									<button
										className={` px-3 ml-3 mr-3 max-sm:fixed bottom-0 left-0 right-0 max-sm:mb-4  py-2 border-2 border-[#E1E3F5] bg-white text-[#298DFF] font-medium rounded-md`}
										onClick={handleAddUserClick}>
										<span className="inline-block align-middle">
											<span className="inline-block align-middle mr-2 -mt-1">
												<AddDirectory />
											</span>
											New directory
										</span>
									</button>
								</div>
							)}
						</div>
					</div>
					{showSidebar && (
						<aside
							className={`${
								showSidebar ? 'translate-x-0' : '-translate-x-full'
							} lg:translate-x-0  transition-transform w-[360px] max-sm:w-full fixed lg:static inset-0 bg-white text-gray-800 p-4 border-r flex flex-col justify-between z-40`}>
							<div>
								<h1 onClick={handleSidebarClose}>hello</h1>
							</div>
						</aside>
					)}
				</div>
				{/* Popups */}

				{popupType === 'removeUser' && (
					<RemoveUserPopup onClose={handlePopupClose} text={'Delete directory?'} />
				)}
				{popupType === 'editGroup' && (
					<CreateGroupPopup
						text={'Rename directory'}
						buttonText={'Done'}
						placeholder="Name"
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'addGroup' && (
					<CreateGroupPopup
						text={'New directory'}
						buttonText={'Create'}
						placeholder={'Name'}
						onClose={handlePopupClose}
					/>
				)}
				{popupType === 'collabarators' && (
					<AddMemberPopup
						onClose={handlePopupClose}
						placeholderh1={'Collabators'}
						placeholderp={'Access Level'}
					/>
				)}
				{popupType === 'groups' && <GroupsPopup onClose={handlePopupClose} />}
			</div>
		</SideMenu>
	);
};

export default Directory;
