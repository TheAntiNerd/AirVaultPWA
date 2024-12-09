'use client';
import '@/app/globals.css';
import AuthProvider from '@/app/context/AuthProvider';
import NavBar from '@/components/NavBar';
import { useState } from 'react';
import { AlignJustify, X } from 'lucide-react';

export default function UiLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleToggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<AuthProvider>
			<div className="w-full min-h-screen flex bg-white text-black relative">
				<div
					className={`${isSidebarOpen ? 'block' : 'hidden'
						} lg:mt-0 mt-[20px] absolute top-0 left-0 w-full h-full z-50 bg-white lg:hidden`}>
					<NavBar />
				</div>
				<div className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:w-[240px] lg:h-full lg:border-r">
					<NavBar />
				</div>

				<div className={`w-full flex-1 min-h-screen bg-transparent flex flex-col lg:ml-[240px]`}>
					<div
						className={`lg:hidden fixed flex items-center justify-center bg-transparent  w-5 z-50 bg-white ${isSidebarOpen
							? 'md:right-[80px] sm:right-5 sm:top-9 md:top-[95px]'
							: 'sm:left-3 md:top-16 sm:top-9 md:left-20 '
							}`}>
						<button
							onClick={handleToggleSidebar}
							className="bg-transparent grid text-3xl focus:outline-none">
							{isSidebarOpen ? <X className="place-self-end" /> : <AlignJustify />}
						</button>
					</div>
					<div className="px-3 py-6 flex-grow">{children}</div>
				</div>
			</div>
		</AuthProvider>
	);
}
