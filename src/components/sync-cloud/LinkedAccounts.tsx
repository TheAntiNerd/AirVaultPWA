'use client';
import { ArrowLeft, CircleMinus, EllipsisVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AccountsLinked } from '../svgs';

interface Device {
    id: number;
    name: string;
    email: string;
    status: string;
}

const dummyDevices: Device[] = [
    { id: 1, name: "Ritu's AirVault", email: "ritu@example.com", status: 'accepted' },
    { id: 2, name: "John's AirVault", email: "john@example.com", status: 'pending' },
    { id: 3, name: "Sophia's AirVault", email: "sophia@example.com", status: 'rejected' },
    { id: 4, name: "Mike's AirVault", email: "mike@example.com", status: 'accepted' },
    { id: 5, name: "Emma's AirVault", email: "emma@example.com", status: 'pending' },
];

const Dropdown = () => {
    const handleRemove = () => {
        console.log("Remove Device");
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent click event from propagating to parent
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-[50px] rounded-[8px] hover:bg-[#F8FAFD] z-50 shadow-none" asChild>
                <Button onClick={handleClick}>
                    <EllipsisVertical color="#737790" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[170px] rounded-[8px] m-0 p-0" onClick={handleClick}>
                <DropdownMenuItem className="flex space-x-2 h-10">
                    <CircleMinus className="h-5 w-5" color='#737790' />
                    <button onClick={handleRemove} className='text-[#44475B]'>Remove Device</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


const MyDevices = ({ onBack, onNext, onTap }: { onBack: () => void, onNext: () => void, onTap: () => void }) => {
    const [devices, setDevices] = useState<Device[]>(dummyDevices);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Filter devices based on the search term
    const filteredDevices = devices.filter(device => device.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className='flex justify-between mb-10'>
                <div className='flex items-center'>
                    <button
                        className='h-10 w-12 rounded-full flex flex-wrap items-center justify-center hover:bg-[#F0F4FA] cursor-pointer'
                        onClick={onBack}
                    >
                        <ArrowLeft />
                    </button>
                    <div className='w-full text-[#272B42] space-x-2 text-[30px] flex items-center'>
                        Cloud sync
                    </div>
                </div>
                <button className='px-4'
                    onClick={onNext}>
                    Link account
                </button>
            </div>
            <div className='max-w-[600px] mt-1 mx-auto flex flex-wrap items-start justify-center'>
                <div className='w-full flex flex-wrap items-start justify-center'>

                    <div className='w-full flex items-center space-x-2 text-[#272a41] text-[18px] mb-5'>
                        <AccountsLinked className='w-6 h-6' />
                        <p>Accounts linked</p>
                    </div>
                    <div className='w-full flex flex-wrap justify-center items-center text-[#272a41] text-[16px]'>
                        {
                            filteredDevices.map((device) => (
                                <div
                                    key={device.id}
                                    onClick={onTap}
                                    className='w-full h-20 mb-3 hover:bg-[#F0F4FA] cursor-pointer md:px-5 sm:px-3 flex flex-wrap items-center justify-between border-b-[1.5px]'
                                >
                                    <div className='flex flex-wrap items-center justify-between w-full'>
                                        <div className='flex flex-wrap items-center justify-center space-x-4 md:mb-0 sm:mb-4'>
                                            <div className='bg-[#F77925] flex items-center justify-center text-white rounded-full w-10 h-10'>
                                                {device.name[0]}
                                            </div>
                                            <div className=''>
                                                <p className='md:text-[16px] mb-1 sm:text-[14px] text-[#272B42]'>{device.name}</p>
                                                <p className='md:text-[14px] sm:text-[12px]  text-[#737790]'>{device.email}</p>
                                            </div>
                                        </div>
                                        <Dropdown />
                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default MyDevices;
