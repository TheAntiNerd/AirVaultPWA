import React from 'react';
import Modal from '../Modal';

interface PageProps {
    isRemoveOpen: boolean;
    setIsRemoveOpen: (isOpen: boolean) => void;
    deviceToRemove: string | null;
    onConfirmRemove: () => void;
}

const RemoveDeviceModal: React.FC<PageProps> = ({ isRemoveOpen, setIsRemoveOpen, deviceToRemove, onConfirmRemove }) => {
    return (
        <Modal isOpen={isRemoveOpen} setIsOpen={setIsRemoveOpen}>
            <div className="fixed left-1/2 text-center top-1/2 max-h-[85vh] w-[90vw] max-w-[414px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-white p-10 shadow-[1px_4px_6_rgba(34, 34, 34, 0.24)] focus:outline-none">
                <h3 className="text-[#44475B]  mb-4 text-[30px] font-medium">
                    Remove device?
                </h3>
                <span className="text-[#737790] text-base">
                    This can’t be undone
                </span>
                <div className="mt-9 flex justify-between">
                    <button onClick={() => setIsRemoveOpen(false)} className="w-[161px] h-[48px] font-[500] rounded-[8px] border border-[#E1E3F5] text-[#737790] bg-transparent">
                        Cancel
                    </button>
                    <button onClick={onConfirmRemove} className="w-[161px] h-[48px] font-[500] rounded-[8px] text-white  bg-[#298DFF]">
                        Yes! Do it
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default RemoveDeviceModal;
