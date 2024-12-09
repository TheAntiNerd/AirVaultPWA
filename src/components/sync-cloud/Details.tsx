import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NestedAccordion from '../ui/NextedAccordian';

const data = [
	{
		title: 'Item 1',
		content: 'This is content for item 1.',
		children: [
			{
				title: 'Subitem 1.1',
				content: 'This is content for subitem 1.1.',
				children: [
					{
						title: 'Subitem 1.1.1',
						content: 'This is content for subitem 1.1.1.',
						children: [
							{
								title: 'Subitem 1.1.1.1',
								content: 'This is content for subitem 1.1.1.1.',
							},
							{
								title: 'Subitem 1.1.1.2',
								content: 'This is content for subitem 1.1.1.2.',
							},
						],
					},
					{
						title: 'Subitem 1.1.2',
						content: 'This is content for subitem 1.1.2.',
					},
				],
			},
			{
				title: 'Subitem 1.2',
				content: 'This is content for subitem 1.2.',
			},
		],
	},
	{
		title: 'Item 2',
		content: 'This is content for item 2.',
		children: [
			{
				title: 'Subitem 2.1',
				content: 'This is content for subitem 2.1.',
			},
		],
	},
	{
		title: 'Item 3',
		content: 'This is content for item 3.',
		children: [
			{
				title: 'Subitem 3.1',
				content: 'This is content for subitem 3.1.',
				children: [
					{
						title: 'Subitem 3.1.1',
						content: 'This is content for subitem 3.1.1.',
					},
					{
						title: 'Subitem 3.1.2',
						content: 'This is content for subitem 3.1.2.',
						children: [
							{
								title: 'Subitem 3.1.2.1',
								content: 'This is content for subitem 3.1.2.1.',
							},
							{
								title: 'Subitem 3.1.2.2',
								content: 'This is content for subitem 3.1.2.2.',
							},
						],
					},
				],
			},
		],
	},
];

const Details = ({
	onBack,
	onNext,
	name,
}: {
	onBack: () => void;
	onNext: (nameValue: string, provider: string) => void;
	name: string;
}) => {
	const [selectedProvider, setSelectedProvider] = useState('');
	const [selectedAirVaultPath, setSelectedAirVaultPath] = useState('');
	const [selectedCloudPath, setSelectedCloudPath] = useState('');

	const countLetters = (text: string) => text.replace(/\s/g, '')?.length;

	const handleProviderChange = (value: string) => {
		setSelectedProvider(value);
	};

	const handleAirVaultPathSelect = (path: string) => {
		setSelectedAirVaultPath(path);
	};

	const handleCloudPathSelect = (path: string) => {
		setSelectedCloudPath(path);
	};

	return (
		<>
			<div className="flex items-center mb-10">
				<button
					className="h-10 w-10 rounded-full flex flex-wrap items-center justify-center hover:bg-[#F0F4FA] cursor-pointer"
					onClick={onBack}>
					<ArrowLeft />
				</button>
				<div className="w-full ext-[#272B42] space-x-2 text-[30px] flex items-center">Cloud credentials</div>
			</div>
			<div className="flex items-start md:items-center justify-center">
				<div className="md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap">
					<div className="w-full">
						{/* Transfer Direction */}
						<div className="flex-wrap mb-3 text-[#44475B] w-full text-[16px]">Direction</div>
						<div className="flex items-center justify-center flex-wrap text-center w-full mb-6">
							<Select onValueChange={handleProviderChange}>
								<SelectTrigger className="w-full px-6 h-12 border-[#C4C7E3] rounded-[8px]">
									<div className={selectedProvider === '' ? 'text-[#737790]' : 'text-[#44475B]'}>
										<SelectValue placeholder="--Select--" />
									</div>
								</SelectTrigger>
								<SelectContent className="bg-white rounded-[8px]">
									<SelectGroup>
										<SelectItem className="h-12 px-6" value="Upload">
											Upload
										</SelectItem>
										<SelectItem className="h-12 px-6" value="Download">
											Download
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						{/* Transfer Mode */}
						<div className="flex-wrap mb-3 text-[#44475B] w-full text-[16px]">Transfer mode</div>
						<div className="flex items-center justify-center flex-wrap text-center w-full mb-6">
							<Select onValueChange={handleProviderChange}>
								<SelectTrigger className="w-full px-6 h-12 border-[#C4C7E3] rounded-[8px]">
									<div className={selectedProvider === '' ? 'text-[#737790]' : 'text-[#44475B]'}>
										<SelectValue placeholder="--Select--" />
									</div>
								</SelectTrigger>
								<SelectContent className="bg-white text-[#44475B] rounded-[8px]">
									<SelectGroup>
										<SelectItem className="px-6 h-12" value="Sync-file">
											Sync file
										</SelectItem>
										<SelectItem className="px-6 h-12" value="Copy-file">
											Copy file
										</SelectItem>
										<SelectItem className="px-6 h-12" value="Move-file">
											Move file
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="w-full flex justify-between">
						{/* Folder from AirVault */}
						<div className="w-[48%]">
							<div className="flex-wrap mb-3 text-[#44475B] text-[16px]">Folder from AirVault</div>
							<div className="flex items-center justify-center flex-wrap text-center w-full">
								<input
									className="w-full text-[#737790] h-12 focus:border-[#C4C7E3] outline-none rounded-[8px] border-[1.4px] px-[20px] border-[#C4C7E3]"
									type="text"
									value={selectedAirVaultPath}
									readOnly
								/>
							</div>
							<div className="h-48 border-[1.5px] border-[#CCCCCC] rounded-[8px] mt-2 overflow-y-scroll">
								<NestedAccordion items={data} onSelectPath={handleAirVaultPathSelect} />
							</div>
						</div>

						<div className="w-[48%]">
							<div className="flex-wrap mb-3 text-[#44475B] text-[16px]">Folder on Cloud</div>
							<div className="flex items-center justify-center flex-wrap text-center w-full">
								<input
									className="w-full text-[#737790] h-12 focus:border-[#C4C7E3] outline-none rounded-[8px] border-[1.4px] px-[20px] border-[#C4C7E3]"
									type="text"
									value={selectedCloudPath}
									readOnly
								/>
							</div>
							<div className="h-48 border-[1.5px] border-[#CCCCCC] rounded-[8px] mt-2 overflow-y-scroll">
								<NestedAccordion items={data} onSelectPath={handleCloudPathSelect} />
							</div>
						</div>
					</div>

					<div className="flex flex-wrap justify-center mt-10 font-[300] text-[16px] items-center">
						<button
							// onClick={() => onNext(nameValue, selectedProvider)}
							disabled={selectedProvider === ''}
							className={`px-4 h-12 rounded-[8px] text-[#FFFFFF] ${
								selectedProvider === ''
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-[#298DFF] cursor-pointer'
							}`}>
							Start sync
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Details;
