import React from 'react';

const LoadingScreen = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white">
			<div className="flex items-center px-3 justify-center min-h-[calc(100vh_-_49px)]">
				<div className="md:w-[600px] justify-center items-center flex flex-wrap md:mb-[200px]">
					<div className="flex flex-wrap items-center justify-center">
						<div className="loader mb-9" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingScreen;
