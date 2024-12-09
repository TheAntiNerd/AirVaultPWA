import { ArrowLeft, ArrowRight, EllipsisVertical } from 'lucide-react';
import React from 'react'
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const InviteUsers = () => {
    return (
        <div className='flex min-h-screen lg:max-w-[700px] mx-auto items-start md:pt-[52px] pt-6 sm:pt-6 lg:pt-[52px] w-full justify-center md:px-[72px]'>
            <div className='w-full justify-center items-start flex flex-wrap'>
                <div className='lg:text-center lg:pl-0 md:pl-10 sm:pl-10 pl-10 flex items-center flex-wrap  justift-start lg:justify-center w-full text-[30px] mb-9'>
                    Invite user
                </div>

                <div className='w-full items-center justify-center flex flex-wrap text text-[#454659]'>
                    <div className='flex items-center justify-center flex-wrap text-center w-full mb-6'>
                        <label className='w-full text-left mb-3'>
                            Enter the email of your teammate *
                        </label>
                        <input
                            className='md:w-full outline-none w-full focus:border-[#298DFF] font-light h-[56px] rounded-[8px] border-[1.4px] px-[15px] border-[#C4C7E3]'
                            type='text'
                            placeholder="email@domain.com"
                        />
                    </div>
                    <div className='flex items-center justify-between flex-wrap text-center w-full mb-6'>
                        Assign role to your teammates *
                        <Select>
                            <SelectTrigger className="w-[180px] h-11 mt-3 rounded-[8px]">
                                <SelectValue placeholder="Default" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Default">Default</SelectItem>
                                    <SelectItem value="apple">Admin</SelectItem>
                                    <SelectItem value="banana">Moderatoe</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex w-full items-center justify-between flex-wrap text-center mb-[24px]'>
                        <div className='text-left'>Add teammates to your groups <span className='font-light'>(optional)</span></div>
                        <Select >
                            <SelectTrigger className="w-[180px] h-11 mt-3 rounded-[8px]">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Default">Default</SelectItem>
                                    <SelectItem value="apple">Admin</SelectItem>
                                    <SelectItem value="banana">Moderatoe</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex w-full md:relative bottom-0 absolute flex-wrap justify-center mt-10 font-[300] text-[16px] items-center'>
                        <Link
                            className='md:w-[122px] md:relative absolute md:bottom-0 bottom-[15px] w-[96%] h-12 md:mr-5 rounded-[8px] flex flex-wrap items-center justify-center cursor-pointer' href={'/users'}                        // onClick={onBack}
                        >
                            <ArrowLeft className='mr-[10px]' /> Back
                        </Link>

                        <button
                            // onClick={() => onNext()}
                            className={`md:w-[122px] w-[96%] md:bottom-0 bottom-[70px] md:relative absolute h-12 rounded-[8px] bg-[#298DFF] cursor-pointer text-[#FFFFFF]`}
                        >
                            Send invite
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default InviteUsers
