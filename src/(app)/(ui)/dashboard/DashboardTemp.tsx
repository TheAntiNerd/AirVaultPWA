'use client';

import TurnOff from '@/components/dashboard/TurnOff';
import { Power } from 'lucide-react';
import { useState } from 'react';

export function DashboardTemp() {
	const [showPopup, setShowPopup] = useState(false);

	return (
		<>
			<div className="w-full h-full flex justify-center items-center relative">
				<div className="w-full max-w-60">
					<img src="./av-logo.png" alt="AirVault Logo" className="w-full max-w-28 mx-auto mb-4" />
					<h1 className="text-2xl text-center">Welcome to AirVault</h1>
				</div>

				<div className="absolute top-0 right-0">
					<button
						onClick={() => setShowPopup(true)}
						className="p-4 hover:bg-gray-100 rounded-full active:bg-gray-200 transition-all duration-300">
						<Power stroke="#298DFF" />
					</button>
				</div>
			</div>

			{showPopup && <TurnOff setShowPopup={setShowPopup} />}
		</>
	);
}
