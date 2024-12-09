'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
	BsPerson,
	Cloudsync,
	GrStorage,
	Logo,
	Logout,
	LogoWithoutName,
	NavIcon,
	NetworkSymbol,
	RemoteLine,
	Update,
} from './svgs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { ChevronDown, Shield } from 'lucide-react';
import LogoutModal from './Modal/Logout';

const NavBar = () => {
	const [isClient, setIsClient] = useState(false);
	const pathname = usePathname();
	const [previousPath, setPreviousPath] = useState<string | null>(null);
	const [openItems, setOpenItems] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [clickTimestamps, setClickTimestamps] = useState<Record<string, number>>({});

	useEffect(() => {
		setIsClient(true);
		setPreviousPath(localStorage.getItem('previousPath') || null);
		localStorage.setItem('previousPath', pathname);

		// Set accordion item open if an active path is within the Accounts section
		if (pathname === '/users' || pathname === '/groups') {
			setOpenItems(['item-1']);
		}
	}, [pathname]);

	if (!isClient) {
		return null;
	}

	const isActive = (path: string) => pathname === path;
	const isPreviouslyActive = (path: string) => previousPath === path;

	const handleAccordionClick = (item: string) => {
		const currentTimestamp = Date.now();
		const lastClickTimestamp = clickTimestamps[item] || 0;

		setOpenItems(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]));
		setClickTimestamps(prev => ({ ...prev, [item]: 0 }));
	};

	return (
		<div className="lg:w-[238px] w-full grid lg:p-0 lg:m-0 md:px-[72px] md:py-16 min-h-screen">
			<div className="w-full flex flex-col p-3 text-[16px] justify-center cursor-pointer">
				<div className="items-center mb-1 justify-start flex flex-wrap">
					<LogoWithoutName className="w-[214px] h-[48px] mr-[8px] italic" />
				</div>
				<div className="flex-1">
					<Link className="w-full h-14 " href="/dashboard">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 
                            ${isActive('/dashboard') ? 'bg-[#C5DCFC]' : ''} 
                            ${isPreviouslyActive('/dashboard') ? 'bg-[#DBEAFE]' : ''}`}>
							<NavIcon className="text-[24px] mr-[20px]" />
							Dashboard
						</div>
					</Link>

					<Accordion type="multiple" className="w-full" defaultValue={openItems}>
						{/* Accounts Accordion */}
						<AccordionItem className="" value="item-1">
							<AccordionTrigger
								className="w-full rounded-[8px] flex-1 h-14 flex text-left items-center justify-start hover:bg-[#E9F2FF]"
								onClick={() => handleAccordionClick('item-1')}>
								<BsPerson className="lg:w-[38px] lg:ml-3 lg:mr-[4px] lg:h-[38px] w-[32px] h-[32px] ml-[20px]" />
								<div className="w-full mx-4 flex flex-wrap items-center justify-between">
									<p>Accounts</p>
									<ChevronDown
										className={`h-4 w-4 shrink-0 transition-transform duration-300 
                                        ${openItems.includes('item-1') ? 'rotate-180' : ''}`}
									/>
								</div>
							</AccordionTrigger>

							<div
								className={`w-full transition-all duration-300 
                                ${openItems.includes('item-1') ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
								<Link className="w-full h-14" href={'/users'}>
									<AccordionContent
										className={`w-full h-14 rounded-[8px] pl-14 flex items-center cursor-pointer hover:bg-[#E9F2FF] 
                                            ${isActive('/users') ? 'bg-[#C5DCFC]' : ''} 
                                            ${isPreviouslyActive('/users') ? 'bg-[#DBEAFE]' : ''}`}>
										Users
									</AccordionContent>
								</Link>
								<Link className="w-full h-14" href={'/groups'}>
									<AccordionContent
										className={`w-full rounded-[8px] h-14 pl-14 flex items-center cursor-pointer hover:bg-[#E9F2FF] 
                                            ${isActive('/groups') ? 'bg-[#C5DCFC]' : ''} 
                                            ${isPreviouslyActive('/groups') ? 'bg-[#DBEAFE]' : ''}`}>
										Groups
									</AccordionContent>
								</Link>
							</div>
						</AccordionItem>
					</Accordion>

					<Link className="w-full h-14" href="/directory">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 ${
								isActive('/directory') ? 'bg-[#C5DCFC]' : ''
							} ${isPreviouslyActive('/directory') ? 'bg-[#DBEAFE]' : ''}`}>
							<GrStorage className="text-[24px] text-[#44475B] mr-[20px]" />
							Directories
						</div>
					</Link>
					{/* <Link className="w-full h-14" href="/remote-share">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 ${
								isActive('/remote-share') ? 'bg-[#C5DCFC]' : ''
							} ${isPreviouslyActive('/remote-share') ? 'bg-[#DBEAFE]' : ''}`}>
							<RemoteLine className="text-[24px] mr-[20px]" />
							Remote share
						</div>
					</Link> */}
					{/* <Link className="w-full h-14" href="/cloud-sync">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 ${
								isActive('/cloud-sync') ? 'bg-[#C5DCFC]' : ''
							} ${isPreviouslyActive('/cloud-sync') ? 'bg-[#DBEAFE]' : ''}`}>
							<Cloudsync className="text-[24px] mr-[20px]" />
							Cloud sync
						</div>
					</Link> */}

					<Link className="w-full h-14" href="/network-share">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 ${
								isActive('/network-share') ? 'bg-[#C5DCFC]' : ''
							} ${isPreviouslyActive('/network-share') ? 'bg-[#DBEAFE]' : ''}`}>
							<NetworkSymbol className="text-[24px] text-[#44475B] mr-[20px]" />
							Network shares
						</div>
					</Link>
					{/* <Link className="w-full h-14" href="/update">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 ${
								isActive('/update') ? 'bg-[#C5DCFC]' : ''
							} ${isPreviouslyActive('/update') ? 'bg-[#DBEAFE]' : ''}`}>
							<Update className="text-[24px] text-[#44475B] mr-[20px]" />
							Version update
						</div>
					</Link> */}
					{/* <Link className="w-full h-14" href="/protection">
						<div
							className={`w-full rounded-[8px] flex hover:bg-[#E9F2FF] cursor-pointer items-center px-3 h-14 ${
								isActive('/protection') ? 'bg-[#C5DCFC]' : ''
							} ${isPreviouslyActive('/protection') ? 'bg-[#DBEAFE]' : ''}`}>
							<Shield className="text-[24px] text-[#44475B] mr-[20px]" />
							Protection
						</div>
					</Link> */}
				</div>
				<button onClick={() => setIsOpen(true)} className="w-full h-14 ">
					<div
						className={`w-full rounded-[8px] flex hover:bg-[#DBEAFE] cursor-pointer items-center px-3 h-14 `}>
						<Logout className="text-[24px] mr-[20px]" />
						Logout
					</div>
				</button>
			</div>
			<LogoutModal setIsOpen={setIsOpen} isOpen={isOpen} />
		</div>
	);
};

export default NavBar;
