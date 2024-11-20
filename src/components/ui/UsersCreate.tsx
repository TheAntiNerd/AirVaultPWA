import React, { useState } from 'react';
import SideMenu from '../SideMenu';
import RemoveIcon from '../../assets/svg/removeuser.svg';
import EditIcon from '../../assets/svg/edituser.svg';
import UserSettingIcon from '../../assets/svg/usersettings.svg';

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

	const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

	const toggleDropdown = (index: number) => {
		setDropdownOpen(dropdownOpen === index ? null : index);
	};

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

	return (
		<SideMenu>
			<div className="w-[1200px] h-screen pt-6 px-3 bg-white text-sans">
				{/* Header */}
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-medium text-gray-800">Users</h1>
					<button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">Add user</button>
				</div>

				{/* Table */}
				<div className="w-full h-[calc(100%-80px)] overflow-y-auto">
					<div className="overflow-hidden rounded-md border border-[#E1E3F5]">
						<table className="w-full border-collapse">
							{/* Table Header */}
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600">Name</th>
									<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
										Username
									</th>
									<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600">
										Password
									</th>
									<th className="px-6 py-6 text-left text-sm font-semibold text-gray-600">Webrole</th>
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
												<a href="#" className="mt-1 text-blue-500 hover:underline text-sm">
													Reset password
												</a>
											</div>
										</td>
										<td className="px-6 py-6 text-gray-600">{user.role}</td>
										<td className="px-4 py-6 text-center">
											<button
												onClick={() => toggleDropdown(index)}
												className="text-gray-500 hover:text-gray-700">
												⋮
											</button>
											{/* Dropdown Menu */}
											{dropdownOpen === index && (
												<div className="absolute right-24 bg-white shadow-lg rounded-lg border border-[#E1E3F5] w-48 h-32 mt-4 z-10">
													<ul className="py-2 text-sm text-left text-[#44475B]">
														<li className="flex items-center px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-sm">
															<RemoveIcon className="mr-3" />{' '}
															{/* Adds 12px margin to the right of the icon */}
															Remove User
														</li>
														<li className="flex items-center px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-sm">
															<EditIcon className="mr-3" />{' '}
															{/* Adds 12px margin to the right of the icon */}
															Edit User
														</li>
														<li className="flex items-center px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer rounded-sm">
															<UserSettingIcon className="mr-3" />{' '}
															{/* Adds 12px margin to the right of the icon */}
															User settings
														</li>
													</ul>
												</div>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</SideMenu>
	);
};

export default UsersCreate;
