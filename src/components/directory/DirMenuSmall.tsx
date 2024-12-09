import { Pencil, Trash2, UserPlus } from 'lucide-react';
import { AddGroup, BsInfoCircle } from '../svgs';

type Props = {
	selectedFolder: string;
	breadcrumbs: string[];
	setShowDirMenu: (show: boolean) => void;
	setShowPopup: (popup: string) => void;
};

export default function DirMenuSmall({ selectedFolder, breadcrumbs, setShowDirMenu, setShowPopup }: Props) {
	function handleClick(popupType: string) {
		setShowDirMenu(false);
		setShowPopup(popupType);
	}

	return (
		<>
			<div className="w-56 p-2 rounded-xl absolute top-6 right-6 z-50 bg-white shadow-lg border border-gray-200">
				<div
					onClick={() => handleClick('rename')}
					className="w-full p-2 flex flex-row justify-start items-center gap-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
					<Pencil color="#737790" className="w-4" />
					<div className="text-gray-600 user-select-none">Rename</div>
				</div>
				<div
					onClick={() => handleClick('collaborators')}
					className="w-full p-2 flex flex-row justify-start items-center gap-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
					<UserPlus color="#737790" className="w-4" />
					<div className="text-gray-600 user-select-none">Collaborators</div>
				</div>
				<div
					onClick={() => handleClick('groups')}
					className="w-full p-2 flex flex-row justify-start items-center gap-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
					<AddGroup color="#737790" className="w-4" />
					<div className="text-gray-600 user-select-none">Groups</div>
				</div>
				<div
					onClick={() => handleClick('details')}
					className="w-full p-2 flex flex-row justify-start items-center gap-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
					<BsInfoCircle color="#737790" className="w-4" />
					<div className="text-gray-600 user-select-none">Details</div>
				</div>
				<div
					onClick={() => handleClick('delete-dir')}
					className="w-full p-2 flex flex-row justify-start items-center gap-4 hover:bg-blue-50 rounded-lg transition-all duration-300">
					<Trash2 color="#737790" className="w-4" />
					<div className="text-gray-600 user-select-none">Delete directory</div>
				</div>
			</div>
			<div
				className="opacity-0 w-full h-full fixed top-0 left-0 bottom-0 right-0 z-40"
				onClick={() => setShowDirMenu(false)}></div>
		</>
	);
}
