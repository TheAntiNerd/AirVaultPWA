'use client'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FiHardDrive, Frame } from '@/components/svgs'

const PoolsHome = ({ onBack, onNext }: { onBack: () => void, onNext: () => void }) => {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 0)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='flex items-start md:items-center justify-center md:px-0 px-3'>
            <div className='md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]'>
                <div className='text-center text-[30px] mb-6'>
                    Storage pools
                </div>
                <div className='flex flex-wrap space-y-3 p-6 border-2 hover:bg-[#E5F1FF] cursor-pointer rounded-[8px] text-[16px]'
                    onClick={onNext}>
                    <div className='text-[20px] w-full flex flex-wrap items-center justify-between'>
                        <div className='text-[20px] flex flex-wrap items-center'>
                            <FiHardDrive className='text-[25px]' />
                            <span className='ml-3'>My pool #1</span>
                        </div>
                        <Frame className='text-6' />
                    </div>
                    <Progress value={progress} className="w-full h-[22px] rounded-[8px] bg-[#E9EEF0] border border-[#E9EEF0] mb-[-5px]" />
                    <div className='flex flex-wrap items-center space-y-2 font-light '>
                        <div className='w-full text-[16px]'>
                            3% used <span className='font-semibold'>(30 GB of 998 GB used)</span>
                        </div>
                        <div className='w-full'>
                            4 of 6 disks are available<Badge className='bg-[#D4FED8] font-normal rounded-10 shadow-none ml-[15px] text-[16px] py-0.5 text-black border-[1.5px] border-[#AAE5B0]'>Healthy</Badge>
                        </div>
                        <div className='w-full'>
                            Data protection level: RX1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PoolsHome
