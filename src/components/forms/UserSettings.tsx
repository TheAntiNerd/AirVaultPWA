import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from '../ui/select';
import { MultiSelectInput } from '../ui/multi-select-input';
import { Spinner } from '../svgs';
import toast from 'react-hot-toast';
import axiosPost from '@/functions/axios/axiosPost';

export default function UserSettings({ handleCancel, handleSuccess, user, getUserList }: any) {
	const { control, handleSubmit } = useForm();
	// const [groups, setGroups] = useState([]);
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState('');

	const groupOptions = [
		{ value: 'group1', label: 'Group 1' },
		{ value: 'group2', label: 'Group 2' },
		{ value: 'group3', label: 'Group 3' },
	];

	const onSubmit = async (data: any) => {
		setLoading(true);

		// change the role of the user
		const username = user?.username || '';
		if (!username) {
			toast.error(`Username of the user was not found!`);
		} else {
			// send the request to the server
			const axiosRes = await axiosPost('/api/user/change-role', {
				username,
				role,
			});

			if (axiosRes && axiosRes?.status === 200 && axiosRes?.data?.success === true) {
				toast.success('Successfully updated user role!');
			} else {
				toast.error(`Failed to update user role!`);
			}
		}

		handleSuccess();
		getUserList();
		setLoading(false);
		// Handle form submission logic here
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
					Role
				</label>
				<Controller
					name="role"
					control={control}
					rules={{
						required: 'Role is required',
						value: role,
						onChange: e => setRole(e?.target?.value || ''),
					}}
					render={({ field }) => (
						<Select onValueChange={(value: string) => field.onChange(value)}>
							<SelectTrigger className="w-full border border-[#C4C7E3] rounded-[8px] h-12">
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								<SelectItem value="member">Member</SelectItem>
								<SelectItem value="moderator">Moderator</SelectItem>
								<SelectItem value="admin">Admin</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
			</div>

			{/* <div>
				<label htmlFor="groups" className="block text-sm font-medium text-gray-700 mb-2">
					Groups
				</label>
				<Controller
					name="groups"
					control={control}
					render={({ field }) => (
						<MultiSelectInput
							id="groups"
							options={groupOptions}
							value={groups}
							onChange={(selectedGroups: any) => {
								console.log('Selected Groups', selectedGroups);
								setGroups(selectedGroups);
								field.onChange(selectedGroups);
							}}
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
						/>
					)}
				/>
			</div> */}

			<div className="flex justify-between mt-4">
				<button
					onClick={() => handleCancel()}
					className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
					Cancel
				</button>
				<button
					type="submit"
					className="flex items-center justify-center w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
					{loading ? (
						<>
							<Spinner className="w-6 h-6" />
						</>
					) : (
						<span>Save</span>
					)}
				</button>
			</div>
		</form>
	);
}
