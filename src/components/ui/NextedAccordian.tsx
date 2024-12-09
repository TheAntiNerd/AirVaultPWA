import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';

interface FolderData {
	name: string;
	hasSubfolders: boolean;
}

interface NestedAccordionProps {
	currentPath: string[];
	onSelectPath: (path: string[]) => void;
}

const NestedAccordion: React.FC<NestedAccordionProps> = ({ currentPath, onSelectPath }) => {
	const [folders, setFolders] = useState<FolderData[]>([]);
	const [path, setPath] = useState<string[]>(currentPath);
	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchFoldersAtPath = async (currentPath: string[]) => {
		try {
			setLoading(true);
			const folderPath = `./${currentPath.join('/')}`;
			const response = await axios.post('/api/directory/list', { path: folderPath });
			setLoading(false);

			// Map each folder item to include a 'hasSubfolders' flag
			const folderData = response.data.contents.map((folder: string) => ({
				name: folder,
				hasSubfolders: response.data.contents.includes(folder), // Change this line as needed based on your API response
			}));

			return folderData;
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
			setLoading(false);
			return [];
		}
	};

	useEffect(() => {
		(async () => {
			const folders = await fetchFoldersAtPath(currentPath);
			setFolders(folders);
		})();
	}, [currentPath]);

	const handleFolderClick = async (folderName: string) => {
		const isExpanded = expanded[folderName];
		setExpanded(prevExpanded => ({
			...prevExpanded,
			[folderName]: !isExpanded,
		}));

		if (!isExpanded) {
			const newPath = [...path, folderName];
			const newFolders = await fetchFoldersAtPath(newPath);
			if (newFolders.length === 0) {
				onSelectPath(newPath);
			}
		}
	};

	return (
		<div className="accordion text-[#44475B]">
			{folders?.length === 0}
			{folders?.map(folder => (
				<div key={folder.name}>
					<div
						className={`folder cursor-pointer px-2  space-y-0.5 flex items-center `}
						onClick={() => handleFolderClick(folder.name)}>
						{folder.hasSubfolders && (
							<span className="arrow mr-2">
								{expanded[folder.name] ? (
									<ChevronDown size={15} color="#8C8FA3" />
								) : (
									<ChevronRight size={15} color="#8C8FA3" />
								)}
							</span>
						)}
						<div className="flex items-center space-x-3">
							<Folder size={15} color="#8C8FA3" />
							<p
								className={`text-[#44475B] font-[300] ${
									expanded[folder.name] ? 'text-blue-500' : 'text-black'
								}`}>
								{folder.name}
							</p>
						</div>
					</div>
					{expanded[folder.name] && folder.hasSubfolders && (
						<div className="ml-3">
							<NestedAccordion currentPath={[...path, folder.name]} onSelectPath={onSelectPath} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default NestedAccordion;
