import toast from 'react-hot-toast';
import { Input, InputPassword } from '../ui/input';

import { useForm } from 'react-hook-form';
import axiosPost from '@/functions/axios/axiosPost';
import { useState } from 'react';

export default function ResetPassword({
	handleSuccess,
	handleCancel,
	okButtonText = 'Update',
	includeOldPassword = false,
	username,
}: any) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [oldPasswordValue, setOldPasswordValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Handle password reset logic here
		if (passwordValue?.length > 0 || confirmPasswordValue?.length > 0) {
			// check if the password matches the confirm password
			if (passwordValue !== confirmPasswordValue) {
				toast.error('Passwords do not match!');
				return;
			}
		}

		// send the request to the server
		const axiosRes = await axiosPost('/api/user/edit', {
			username,
			password: oldPasswordValue,
			new_password: passwordValue,
		});

		if (axiosRes && axiosRes?.status && axiosRes?.data?.success === true) {
			toast.success(axiosRes?.data?.msg || 'Successfully reset the password!');
		} else {
			toast.error(axiosRes?.data?.msg || 'Failed to reset the password!');
		}

		handleSuccess();
	};

	return (
		<form onSubmit={e => onSubmit(e)} className="mt-4">
			{includeOldPassword && (
				<>
					<InputPassword
						value={oldPasswordValue}
						label="Enter Password"
						{...register('oldPassword', {
							required: 'Password is required',
							onChange: e => setOldPasswordValue(e?.target?.value),
						})}
					/>
					{/* {errors.password && <span>{errors?.password?.message as string}</span>} */}
					<br />
				</>
			)}

			<InputPassword
				value={passwordValue}
				label="Enter Password"
				{...register('password', {
					required: 'Password is required',
					onChange: e => setPasswordValue(e?.target?.value),
				})}
			/>
			{/* {errors.password && <span>{errors?.password?.message as string}</span>} */}
			<br />
			<InputPassword
				value={confirmPasswordValue}
				label="Confirm Password"
				{...register('confirmPassword', {
					required: 'Please confirm your password',
					validate: (value, formValues) => value === formValues.password || 'Passwords do not match',
					onChange: e => setConfirmPasswordValue(e?.target?.value),
				})}
			/>
			{/* {errors.confirmPassword && <span>{errors?.confirmPassword?.message as string}</span>} */}

			<div className="flex justify-between mt-4">
				<button
					type="button"
					onClick={() => handleCancel()}
					className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
					Cancel
				</button>
				<button
					type="submit"
					className="w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
					{okButtonText}
				</button>
			</div>
		</form>
	);
}
