'use client';
import React, { Suspense, useEffect, useState } from 'react';
import CircularProgressWithLabel from '@/components/ui/CircularProgressWithLabel';
import { CPUSymbol, MemorySymbol, StorageSymbol } from '@/components/svgs';

// type for dashboard data
type DashboardItem = {
    value: string;
    data: string;
    used: string;
    icon: React.ElementType;
    name: string;
    type: string;
};


const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState<DashboardItem[]>([
        {
            value: '78',
            data: 'CPU',
            used: '1 of 4 used',
            icon: CPUSymbol,
            name: 'Processor',
            type: '4 cores',
        },
        {
            value: '12',
            data: 'Memory',
            used: '12 of 4 GiB used',
            icon: MemorySymbol,
            name: 'RAM',
            type: '4GB',
        },
        {
            value: '12',
            data: 'Storage',
            used: '0.12 TB of 15 TB',
            icon: StorageSymbol,
            name: 'Storage',
            type: '16TB',
        },
    ])
    return (
        <div className='grid max-w-[940px] mx-auto pt-[56px] lg:flex xl:grid xl:grid-cols-3 lg:justify-between flex-wrap gap-20 '>
            {dashboardData.map((item, index) => (
                <div key={index} className='flex flex-col items-center'>
                    <CircularProgressWithLabel value={parseInt(item.value)}>
                        <div className='flex flex-col items-center text-center justify-center absolute inset-0'>
                            <h3 className='text-[#44475B] block text-[44px] font-semibold'>{item.value}%</h3>
                            <span className='text-[20px] block text-[#727799]'>{item.data}</span>
                            <span className='text-[15px] block text-[#727799]'>{item.used}</span>
                        </div>
                    </CircularProgressWithLabel>
                    <div className='flex flex-col items-center mt-6'>
                        <item.icon className="flex-none w-10 h-10 mb-3" />
                        <span className='text-[#737790] mb-1 text-base font-medium'>{item.name}</span>
                        <span className='text-xl text-[#44475B] font-semibold '>{item.type}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
