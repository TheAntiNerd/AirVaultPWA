'use client';
import React, { useEffect } from 'react';

const Processing5 = () => {
	return (
		<div className="flex items-center px-3 justify-center min-h-screen">
			<div className="md:w-[600px] justify-center items-center flex flex-wrap md:mb-[200px]">
				<div className="flex flex-wrap items-center justify-center">
					<div className="loader mb-9" />
					<div className="text-center text-[30px] w-full">This might take a while...</div>
				</div>
				<div className="text-center mt-3 font-light">
					Please keep your device powered on during this process...
				</div>
			</div>
		</div>
	);
};

export default Processing5;
