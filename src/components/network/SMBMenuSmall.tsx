import { Power } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	setShowSmallMenu: Dispatch<SetStateAction<boolean>>;
	handleSMBToggle: () => Promise<void>;
	smbActive: boolean | null;
};

export default function SMBMenuSmall({ setShowSmallMenu, handleSMBToggle, smbActive }: Props) {
	function handleClick() {
		setShowSmallMenu(false);
		handleSMBToggle();
	}

	return (
		<>
			<div className="w-56 p-2 rounded-xl absolute top-6 right-6 z-50 bg-white shadow-lg border border-gray-200">
				<div
					onClick={() => handleClick()}
					className="w-full p-2 flex flex-row justify-start cursor-pointer items-center gap-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
					<Power color="#737790" className="w-4" />
					<div className="text-gray-600 user-select-none">Turn {smbActive ? 'off' : 'on'} service</div>
				</div>
			</div>
			<div
				className="opacity-0 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-40"
				onClick={() => setShowSmallMenu(false)}></div>
		</>
	);
}
