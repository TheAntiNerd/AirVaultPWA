import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function ChangeUserRole({ handleSuccess, handleCancel }: any) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const [role, setRole] = useState('');

	const onSubmit = (data: any) => {
		console.log({ ...data, role });
		handleSuccess();
		// Handle adding member to group logic here
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="mb-4">
				<label className="block mb-2">Select Role</label>
				<Select onValueChange={(value: string) => setRole(value)}>
					<SelectTrigger className="w-full border border-[#C4C7E3] rounded-[8px] h-12">
						<SelectValue placeholder="Select a role" />
					</SelectTrigger>
					<SelectContent className="bg-white">
						<SelectItem value="member">Member</SelectItem>
						<SelectItem value="admin">Admin</SelectItem>
						<SelectItem value="owner">Owner</SelectItem>
					</SelectContent>
				</Select>
				{!role && <span className="text-red-500 text-sm">Please select a role</span>}
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					onClick={handleCancel}
					className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
					Cancel
				</button>
				<button
					type="submit"
					className="w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
					Add Member
				</button>
			</div>
		</form>
	);
}
