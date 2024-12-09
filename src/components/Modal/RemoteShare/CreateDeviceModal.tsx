import React, { useState } from 'react';
import Modal from '../Modal';
import * as Form from '@radix-ui/react-form';

interface PageProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addDevice: (deviceName: string) => void;
    remoteShareListData: { name: string }[];
}

const CreateDeviceModal: React.FC<PageProps> = ({ isOpen, setIsOpen, addDevice, remoteShareListData }) => {
    const [deviceName, setDeviceName] = useState('');
    const [hasError, setHasError] = useState(false);
    const [nameExists, setNameExists] = useState(false);
    const [invalidFormat, setInvalidFormat] = useState(false); // State for format validation

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasError(false);
        setNameExists(false);
        setInvalidFormat(false);

        const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(deviceName);

        // Validate that the name is alphanumeric and unique
        if (!isAlphanumeric) {
            setInvalidFormat(true);
            return;
        }

        if (remoteShareListData.some(device => device.name === deviceName)) {
            setNameExists(true);
            return;
        }

        // If validation passes, call addDevice
        addDevice(deviceName);
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="fixed left-1/2 text-center top-1/2 max-h-[85vh] w-[90vw] max-w-[414px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-white p-10 shadow-[1px_4px_6_rgba(34, 34, 34, 0.24)] focus:outline-none data-[state=open]:animate-contentShow">
                <h3 className="text-[#44475B] mb-6 text-[30px] font-medium">
                    Create Device
                </h3>
                <Form.Root onSubmit={handleLogin} className="flex flex-col w-full gap-9">
                    <Form.Field name="name">
                        <Form.Label className="block text-base text-left mb-2 font-medium leading-6 text-[#44475B]">
                            Name
                        </Form.Label>
                        <Form.Control asChild>
                            <input
                                required
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Somename"
                                value={deviceName}
                                onChange={(e) => setDeviceName(e.target.value)}
                                onInvalid={() => setHasError(true)}
                                onInput={() => setHasError(false)}
                                className={`border rounded-[8px] px-6 py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] 
                                    ${hasError || nameExists || invalidFormat ? 'border-[#EB7B71] focus:border-[#EB7B71]' : 'border-[#C4C7E3]'} focus:border-[#298DFF]`}
                            />
                        </Form.Control>
                        <Form.Message className="text-[13px] block text-left text-[#EB7B71]" match="valueMissing">
                            Please enter device name
                        </Form.Message>
                        {invalidFormat && (
                            <span className="text-[13px] text-left block text-[#EB7B71]">
                                Name should not contain spaces.
                            </span>
                        )}
                        {nameExists && (
                            <span className="text-[13px] text-left block text-[#EB7B71]">
                                Name exists already
                            </span>
                        )}
                    </Form.Field>
                    <div className="flex justify-between">
                        <button
                            type='button'
                            onClick={() => setIsOpen(false)}
                            className="w-[161px] h-[48px] font-[500] rounded-[8px] border border-[#E1E3F5] text-[#737790] bg-transparent">
                            Cancel
                        </button>
                        <Form.Submit asChild>
                            <button
                                type="submit"
                                className="w-[161px] h-[48px] font-[500] rounded-[8px] text-white bg-[#298DFF]">
                                Create Device
                            </button>
                        </Form.Submit>
                    </div>
                </Form.Root>
            </div>
        </Modal>
    );
};

export default CreateDeviceModal;
