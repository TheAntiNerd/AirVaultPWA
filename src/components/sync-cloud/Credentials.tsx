import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Credentials = ({
	onBack,
	onNext,
	name,
}: {
	onBack: () => void;
	onNext: (nameValue: string, provider: string) => void;
	name: string;
	provider: string;
}) => {
	const [nameLetterCount, setNameLetterCount] = useState(0);
	const [nameValue, setNameValue] = useState(name);
	const [selectedProvider, setSelectedProvider] = useState(''); // State for the selected provider

	const countLetters = (text: string) => text.replace(/\s/g, '')?.length;

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const letterCount = countLetters(value);
		if (letterCount <= 63) {
			setNameLetterCount(letterCount);
			setNameValue(value);
		}
	};

	const handleProviderChange = (value: string) => {
		setSelectedProvider(value); // Update the selected provider
	};

	useEffect(() => {
		setNameValue(name);
		setNameLetterCount(countLetters(name));
	}, [name]);

	return (
		<>
			<div className="flex items-center mb-10">
				<button
					className="h-10 w-10 rounded-full flex flex-wrap items-center justify-center hover:bg-[#F0F4FA] cursor-pointer"
					onClick={onBack}>
					<ArrowLeft />
				</button>
				<div className="w-full text-[#272B42] space-x-2 text-[30px] flex items-center">Cloud credentials</div>
			</div>
			<div className="flex items-start justify-center">
				<div className="md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap">
					<div className="flex-wrap mb-3 text-[#44475B] md:w-full w-[80%] text-[16px]">
						Give a name for your account
					</div>

					<div className="flex items-center justify-center flex-wrap text-center w-full">
						<input
							className="w-full text-[16px] text-[#44475B] h-12 focus:border-[#298DFF] outline-none rounded-[8px] border-[1.5px] px-6 py-3 border-[#C4C7E3]"
							type="text"
							placeholder="Enter the name"
							value={nameValue}
							onChange={handleNameChange}
						/>
						<div className="w-full flex flex-wrap justify-end text-[11px]">
							<span className="mr-3 translate-y-[-9px] bg-white px-[3px]">{nameLetterCount}/63</span>
						</div>
					</div>

					<div className="flex-wrap mb-3 text-[#44475B] md:w-full w-[80%] text-[16px]">
						Choose the provider
					</div>

					<div className="flex items-center justify-center flex-wrap text-center w-full">
						<Select onValueChange={handleProviderChange}>
							{' '}
							{/* Handle provider selection */}
							<SelectTrigger className="w-full px-6 py-3 h-12 border-[#C4C7E3] rounded-[8px]">
								<div
									className={
										selectedProvider === ''
											? 'text-[#737790] text-[16px]'
											: 'text-[#44475B] text-[16px]'
									}>
									<SelectValue placeholder="--Select--" />
								</div>
							</SelectTrigger>
							<SelectContent className="bg-white text-[#44475B] rounded-[8px]">
								<SelectGroup>
									<SelectItem className="text-[#44475B] h-12" value="google">
										Google Drive
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="flex  flex-wrap justify-center mt-10 font-[300] text-[16px] items-center">
						<button
							onClick={() => onNext(nameValue, selectedProvider)} // Pass both nameValue and selectedProvider
							disabled={nameLetterCount === 0 || selectedProvider === ''} // Disable button if no name or provider is selected
							className={`px-4 h-12 rounded-[8px] text-[#FFFFFF] ${
								nameLetterCount === 0 || selectedProvider === ''
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-[#298DFF] cursor-pointer'
							}`}>
							Link to provider
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Credentials;
