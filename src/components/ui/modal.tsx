'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Spinner } from '../svgs';

interface ModalProps {
	header: string;
	children: React.ReactNode;
	handleCancel: () => void;
	handleSuccess: () => void;
	okButtonText?: string;
	showFooter?: boolean;
	isOpen: boolean;
	btnLoading: boolean;
}

const Modal: React.FC<ModalProps> = ({
	header,
	children,
	handleCancel,
	handleSuccess,
	okButtonText = 'Save',
	showFooter = true,
	isOpen,
	btnLoading
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-[414px]" style={{ borderRadius: '12px', padding: '40px' }}>
				<div className="flex justify-center items-center">
					<h2 className="text-xl font-semibold text-[30px]">{header}</h2>
				</div>
				<div className={showFooter ? 'py-4' : ''}>{children}</div>
				{showFooter ? (
					<div className="flex justify-between">
						<button
							onClick={handleCancel}
							className="w-[48%] px-4 py-2 text-sm font-medium text-[#737790] bg-white border border-[#E1E3F5] rounded-[8px] hover:bg-gray-50 h-[48px]">
							Cancel
						</button>
						<button
							onClick={handleSuccess}
							className="flex items-center justify-center w-[48%] px-4 py-2 text-sm font-medium text-white bg-[#298DFF] rounded-[8px] hover:bg-blue-700 h-[48px]">
							
							{btnLoading ? (
                    			    <>
										<Spinner className="w-6 h-6 mr-2" />
									</>
								) : (
									<span>{okButtonText}</span>
								)}
						</button>
					</div>
				) : null}
			</div>
		</div>
	);
};

export { Modal };
