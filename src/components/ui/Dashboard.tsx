import { useEffect, useState } from 'react';
import SideMenu from '../SideMenu';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import CpuIcon from '../../assets/svg/cpu-icon.svg';
import RamIcon from '../../assets/svg/ram-icon.svg';
import StorageIcon from '../../assets/svg/storage-icon.svg';

function Dashboard() {
	const [cpu, setCpu] = useState(0);
	const [memory, setMemory] = useState(0);
	const [storage, setStorage] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setCpu(78);
			setMemory(12);
			setStorage(12);
		}, 200);
		return () => clearTimeout(timer);
	}, []);

	const cardData = [
		{
			label: 'CPU',
			percentage: cpu,
			detail: '1 of 4 used',
			icon: <CpuIcon />,
			spec: 'Processor',
			specValue: '4 cores',
		},
		{
			label: 'Memory',
			percentage: memory,
			detail: '12 of 4 GiB used',
			icon: <RamIcon />,
			spec: 'RAM',
			specValue: '4GB',
		},
		{
			label: 'Storage',
			percentage: storage,
			detail: '0.12 TB of 15 TB',
			icon: <StorageIcon />,
			spec: 'Storage',
			specValue: '16TB',
		},
	];

	return (
		<SideMenu>
			<div className="flex justify-center items-start bg-white py-10 overflow-x-auto">
				<div className="flex flex-wrap gap-8 justify-center">
					{cardData.map((item, index) => (
						<div key={index} className="flex flex-col items-center w-full sm:w-80 flex-shrink-0">
							{/* Circular Progress Bar */}
							<div className="relative w-56 h-56 mb-4">
								<CircularProgressbar
									value={item.percentage}
									styles={buildStyles({
										textSize: '0px', // Hide default text
										pathColor: '#3B82F6',
										trailColor: '#D1D5DB',
									})}
								/>
								{/* Custom text inside the circle */}
								<div className="absolute inset-0 flex flex-col items-center justify-center">
									<p className="text-gray-900 text-3xl font-semibold">{item.percentage}%</p>
									<p className="text-gray-500 text-lg">{item.label}</p>
									<p className="text-gray-500 text-sm">{item.detail}</p>
								</div>
							</div>
							{/* Icon and Spec Details */}
							<div className="flex flex-col items-center text-center">
								{item.icon} {/* Render the imported SVG component */}
								<p className="text-gray-500 text-lg font-medium">{item.spec}</p>
								<p className="text-gray-900 text-xl font-bold">{item.specValue}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</SideMenu>
	);
}

export default Dashboard;
