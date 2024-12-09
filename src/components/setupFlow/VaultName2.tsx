import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const VaultName2 = ({
	onBack,
	onNext,
	name,
}: {
	onBack: () => void;
	onNext: (nameValue: string) => void;
	name: string;
}) => {
	const [nameLetterCount, setNameLetterCount] = useState(0);
	const [nameValue, setNameValue] = useState(name);

	const countLetters = (text: string) => text.replace(/\s/g, '')?.length;

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const letterCount = countLetters(value);
		if (letterCount <= 63) {
			setNameLetterCount(letterCount);
			setNameValue(value);
		}
	};

	useEffect(() => {
		setNameValue(name);
		setNameLetterCount(countLetters(name));
	}, [name]);

	return (
		<div className="flex items-start md:items-center min-h-screen justify-center">
			<div className="md:w-[600px] mt-6 justify-center md:items-center items-start flex flex-wrap md:mb-[200px]">
				<div className="flex items-center text-[#272B42] justify-center flex-wrap text-center mb-[12px] md:w-full w-[80%] text-[30px]">
					Give your AirVault a name
				</div>

				<div className="flex items-center justify-center flex-wrap text-center w-full">
					<input
						className="md:w-full w-[96%] font-light h-14 focus:border-[#298DFF] outline-none rounded-[8px] text-[#44475B] border-[1.4px] px-[20px] border-[#C4C7E3]"
						type="text"
						placeholder="My Supercool AirVault"
						value={nameValue}
						onChange={handleNameChange}
					/>
					<div className="w-full flex flex-wrap justify-end text-[11px]">
						<span className="mr-3 translate-y-[-9px] bg-white px-[3px]">{nameLetterCount}/63</span>
					</div>
				</div>

				<div className="flex w-full md:relative bottom-0 absolute flex-wrap justify-center mt-10 font-[300] text-[16px] items-center">
					<button
						className="md:w-[122px] md:relative absolute md:bottom-0 bottom-[15px] w-[96%] h-12 md:mr-5 rounded-[8px] flex flex-wrap items-center justify-center cursor-pointer"
						onClick={onBack}>
						<ArrowLeft className="mr-[10px]" /> Back
					</button>

					<button
						onClick={() => onNext(nameValue)} // Pass the current nameValue to the parent
						disabled={nameLetterCount === 0} // Disable button if no name is provided
						className={`md:w-[122px] w-[96%] md:bottom-0 bottom-[70px] md:relative absolute h-12 rounded-[8px] text-[#FFFFFF] ${
							nameLetterCount === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#298DFF] cursor-pointer'
						}`}>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default VaultName2;
