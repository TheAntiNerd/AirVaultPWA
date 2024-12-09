'use client';

import React, { useState, useEffect } from 'react';
import NextedAccordians from '../ui/NextedAccordians';
import axiosPost from '@/functions/axios/axiosPost';

const Directories = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => {
	const [selectedAirVaultPath, setSelectedAirVaultPath] = useState('');
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleAirVaultPathSelect = (path: string) => {
		setSelectedAirVaultPath(path);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await axiosPost('/api/directory/list', {
					path: './',
				});
				setData(response.data?.contents);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="">
			<div className="">
				<NextedAccordians items={data} onSelectPath={handleAirVaultPathSelect} poolname={'Pool1'} />
			</div>
			<div></div>
		</div>
	);
};

export default Directories;
