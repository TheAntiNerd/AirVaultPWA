import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Modal from './Modal';
import { signOut } from 'next-auth/react';
interface PageProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}
const LogoutModal: React.FC<PageProps> = ({ isOpen, setIsOpen }) => (
	<>
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="fixed left-1/2 text-center top-1/2 max-h-[85vh] w-[90vw] max-w-[414px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-white p-10 shadow-[1px_4px_6_rgba(34, 34, 34, 0.24)] focus:outline-none data-[state=open]:animate-contentShow">
				<h3 className="text-[#44475B] text-[30px] font-medium">Logout?</h3>
				<div className="mt-9 flex justify-between">
					<button
						onClick={() => setIsOpen(false)}
						className="w-[161px] h-[48px] font-[500] rounded-[8px] border border-[#E1E3F5] text-[#737790] bg-transparent">
						Cancel
					</button>
					<button
						className="w-[161px] h-[48px] font-[500] rounded-[8px] text-white  bg-[#298DFF]"
						onClick={() => signOut()}>
						Yes
					</button>
				</div>
			</div>
		</Modal>
	</>
);

export default LogoutModal;
