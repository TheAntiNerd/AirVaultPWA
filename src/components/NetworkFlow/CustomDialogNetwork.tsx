'use client';
import axios from 'axios';
import { FC, useState } from 'react';
import NestedAccordion from '../ui/NextedAccordian';

interface CustomDialogProps {
	open: boolean;
	onClose: () => void;
	userName?: string;
	type: 'delete' | 'directory' | 'turnon' | 'turnoff' | 'rename';
	path?: string;
	refetchData: () => void; // Add this prop
}

const CustomDialogNetwork: FC<CustomDialogProps> = ({ open, onClose, type, userName, path, refetchData }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [nameInput, setNameInput] = useState(userName || ''); // State for the input value
	const [selectedCloudPath, setSelectedCloudPath] = useState('');

	const maxLength = 63;

	if (!open) return null;

	const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value?.length <= maxLength) {
			setNameInput(value);
		}
	};

	const fetchSubfolders = async (path: string[]) => {
		try {
			const response = await axios.post('/api/directory/list', { path: `./${path.join('/')}` });
			return response.data.contents;
		} catch (err) {
			console.error('Error fetching subfolders:', err);
			return [];
		}
	};

	const handleCloudPathSelect = (path: string[]) => {
		setSelectedCloudPath(path.join('/'));
	};

	const createSMB = async (path: string, name: string) => {
		try {
			setLoading(true);
			const response = await axios.post('/api/smb/create', {
				folder_path: path,
				share_name: name,
			});
			console.log(response);
			setLoading(false);
			refetchData(); // Refetch the SMB list after success
			onClose(); // Close the dialog after creation
		} catch (err) {
			console.error('Error creating SMB:', err);
			setLoading(false);
		}
	};

	const renderContent = () => {
		switch (type) {
			case 'directory':
				return (
					<>
						<div className="flex flex-wrap">
							<label className="mb-2 text-[#44475B] text-[14px] font-light">Name*</label>
							<input
								type="text"
								value={nameInput}
								onChange={handleNameInputChange}
								placeholder=""
								className="w-full rounded-[8px] border-[#C4C7E3] text-[#44475B] border px-6 py-4 text-[14px] focus:outline-blue-500"
							/>
							{/* Character counter */}
							<div className="w-full flex items-center justify-end -translate-y-2.5 -translate-x-3 text-[12px] text-[#737790]">
								<p className="bg-white px-2">
									{nameInput?.length}/{maxLength}
								</p>
							</div>
						</div>
						<div className="w-full -translate-y-5">
							<div className="flex-wrap mb-2 font-[300]  text-[#44475B] text-[16px]">Location*</div>
							<div className="flex items-center justify-center flex-wrap text-center w-full">
								<input
									className="w-full text-[#737790] h-14 focus:border-[#C4C7E3] outline-none rounded-[8px] border-[1.4px] px-[20px] border-[#C4C7E3]"
									type="text"
									value={selectedCloudPath}
									readOnly
								/>
							</div>
							<div className="h-48 border-[1.5px] border-[#CCCCCC] rounded-[8px] mt-2 overflow-y-scroll">
								<NestedAccordion onSelectPath={handleCloudPathSelect} currentPath={[]} />
							</div>
						</div>
					</>
				);

			case 'delete':
				return (
					<>
						<div className="mb-9 w-full text-[#44475B] text-center text-[14px] font-light">
							This can't be undone
						</div>
					</>
				);

			case 'rename':
				return (
					<>
						<div className="flex flex-wrap">
							<label className="mb-2 text-[#44475B] text-[14px] font-light">Name*</label>
							<input
								type="text"
								value={nameInput}
								onChange={handleNameInputChange}
								placeholder=""
								className="w-full rounded-[8px] border-[#C4C7E3] border text-[#44475B] border px-6 py-4 text-[14px] focus:outline-blue-500"
							/>
							<div className="w-full flex items-center justify-end -translate-y-2.5 -translate-x-3 text-[12px] text-[#737790]">
								<p className="bg-white px-2">
									{nameInput.length}/{maxLength}
								</p>
							</div>
						</div>
					</>
				);

			case 'turnoff':
				return (
					<>
						<div className="mb-9 w-full text-[#44475B] text-center text-[14px] font-light">
							You can turn it on later.
						</div>
					</>
				);

			case 'turnoff':
				return <></>;

			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white w-full p-10 max-w-[414px] rounded-[12px] shadow-lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-[30px] text-[#44475B] text-center w-full">
						{type === 'delete' && 'Delete SMB'}
						{type === 'directory' && 'Add new SMB'}
						{type === 'turnon' && 'Turn on service?'}
						{type === 'turnoff' && 'Turn off Service?'}
						{type === 'rename' && 'Rename'}
					</h2>
				</div>

				<div className="space-y-4 mb-6">{renderContent()}</div>

				<div className="flex space-x-3 w-full justify-between font-[300]">
					<button
						onClick={onClose}
						className="px-4 py-4 w-[48%] text-[14px] font-light rounded-[8px] border text-[#737790] hover:bg-gray-100">
						Cancel
					</button>
					{type === 'directory' ? (
						<button
							className="px-4 py-4 text-white w-[48%] font-light text-[14px] rounded-[8px] bg-[#298DFF] hover:bg-blue-600"
							onClick={() => createSMB(selectedCloudPath, nameInput)}>
							Save
						</button>
					) : (
						<button className="px-4 py-4 text-white w-[48%] font-light text-[14px] rounded-[8px] bg-[#298DFF] hover:bg-blue-600">
							{type === 'delete' && 'Yes! Do it'}
							{type === 'turnon' && 'Yes! Do it'}
							{type === 'turnoff' && 'Yes! Do it'}
							{type === 'rename' && 'Rename'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CustomDialogNetwork;
