import React, { ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children, className }) => {
    function open() {
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} as="div" className="relative z-[9999] focus:outline-none" onClose={close}>
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/30 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className={`w-full max-w-md   duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ${className}`}
                    >
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
