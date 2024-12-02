import { useEffect, useRef, useState } from 'react';
import { PasswordEyeClose, PasswordEyeOpen } from '../../assets/svg';

interface ResetPasswordPopupProps {
	onClose: () => void;
	userRole: 'Owner' | 'Admin' | 'Moderator' | 'Default';
	targetUserRole: 'Owner' | 'Admin' | 'Moderator' | 'Default';
	isOwnPasswordReset: boolean;
}

const ResetPasswordPopup: React.FC<ResetPasswordPopupProps> = ({
	onClose,
	userRole,
	targetUserRole,
	isOwnPasswordReset,
}) => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [error, setError] = useState('');
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const modalRef = useRef<HTMLDivElement>(null);

	const canResetPassword = () => {
		if (userRole === 'Owner') {
			return true;
		}

		if (userRole === 'Admin') {
			return isOwnPasswordReset || targetUserRole === 'Moderator' || targetUserRole === 'Default';
		}

		if (userRole === 'Moderator') {
			return targetUserRole === 'Default';
		}

		// Default users cannot reset any password
		return false;
	};

	const validateForm = () => {
		if (isOwnPasswordReset) {
			return oldPassword && newPassword && confirmNewPassword && newPassword === confirmNewPassword;
		}
		return newPassword && confirmNewPassword && newPassword === confirmNewPassword;
	};

	const handleConfirm = () => {
		if (!validateForm()) {
			setError('Passwords do not match or fields are incomplete.');
			return;
		}
		console.log('Password reset confirmed');
		onClose();
	};

	const toggleVisibility = (field: string) => {
		if (field === 'old') setShowOldPassword(!showOldPassword);
		if (field === 'new') setShowNewPassword(!showNewPassword);
		if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
	};

	// Close the modal if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	if (!canResetPassword()) {
		return null; // If the user cannot reset the password, close the popup immediately.
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div
				ref={modalRef}
				className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-sm:w-[320px] max-sm:px-8">
				<h2 className="text-3xl font-medium text-[#44475B] mb-6 text-center">Reset Password</h2>

				{canResetPassword() && (
					<form
						onSubmit={e => {
							e.preventDefault();
							handleConfirm();
						}}>
						{/* Render Old Password Field if the user is resetting their own password */}
						{isOwnPasswordReset && (
							<div className="mb-4 relative">
								<label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">
									Old Password
								</label>
								<input
									type={showOldPassword ? 'text' : 'password'}
									id="old-password"
									value={oldPassword}
									onChange={e => setOldPassword(e.target.value)}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
									required
								/>
								<div
									className="absolute top-9 right-3 cursor-pointer"
									onClick={() => toggleVisibility('old')}>
									{showOldPassword ? <PasswordEyeOpen /> : <PasswordEyeClose />}
								</div>
							</div>
						)}

						<div className="mb-6 relative">
							<label htmlFor="new-password" className="block text-sm font-medium text-[#44475B] mb-1">
								Enter new password
							</label>
							<input
								type={showNewPassword ? 'text' : 'password'}
								id="new-password"
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								className="w-full p-3 border border-[#C4C7E3] rounded-lg focus:outline-none focus:border-[#298DFF]"
								required
							/>
							<div
								className="absolute top-10 right-3 cursor-pointer"
								onClick={() => toggleVisibility('new')}>
								{showNewPassword ? <PasswordEyeOpen /> : <PasswordEyeClose />}
							</div>
						</div>

						<div className="mb-4 relative">
							<label
								htmlFor="confirm-new-password"
								className="block text-sm font-medium text-gray-700 mb-1">
								Confirm New Password
							</label>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								id="confirm-new-password"
								value={confirmNewPassword}
								onChange={e => setConfirmNewPassword(e.target.value)}
								className="w-full p-3 border border-[#C4C7E3] rounded-lg focus:outline-none focus:border-[#298DFF]"
								required
							/>
							<div
								className="absolute top-10 right-3 cursor-pointer"
								onClick={() => toggleVisibility('confirm')}>
								{showConfirmPassword ? <PasswordEyeOpen /> : <PasswordEyeClose />}
							</div>
						</div>

						{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					</form>
				)}

				<div className="flex justify-center items-center mt-9 space-x-3">
					<button
						className="flex-grow bg-white text-[#737790] px-4 py-3 rounded-lg focus:outline-none border border-[#E1E3F5]"
						onClick={onClose}>
						Cancel
					</button>

					{canResetPassword() && (
						<button
							className={`bg-blue-500 text-white px-4 py-3 rounded-lg focus:outline-none flex-grow ${
								!validateForm() ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={!validateForm()}
							onClick={handleConfirm}>
							Update
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPopup;
