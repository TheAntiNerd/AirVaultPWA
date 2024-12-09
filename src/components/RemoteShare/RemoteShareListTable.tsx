import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Trash } from '../svgs'; // Ensure this path is correct

interface Device {
	name: string;
}

interface RemoteShareListTableProps {
	remoteShareListData: Device[];
	onStatusChange: (deviceName: string) => void; // Function to handle status change
	onDelete: (deviceName: string) => void; // Function to handle delete action
}

const RemoteShareListTable: React.FC<RemoteShareListTableProps> = ({
	remoteShareListData,
	onStatusChange,
	onDelete,
}) => {
	const [swtichStatus, setSwtichStatus] = useState(false);
	return (
		<div className="mt-8 flow-root">
			<div className="-overflow-x-auto rounded-[8px]">
				<div className="inline-block min-w-full rounded-[8px] align-middle">
					<div className="overflow-hidden border border-[#E1E3F5] ring-opacity-5 rounded-[8px]">
						<table className="min-w-full divide-y divide-gray-300">
							<thead className="bg-[#F9FAFB]">
								<tr>
									<th scope="col" className="p-6 text-left text-base font-semibold text-[#44475B]">
										Device name
									</th>
									<th
										scope="col"
										className="p-6 w-[70px] text-left text-base font-semibold text-[#44475B]">
										Status
									</th>
									<th
										scope="col"
										className="p-6 w-[70px] text-left text-base font-semibold text-[#44475B]"></th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{remoteShareListData?.length > 0
									? remoteShareListData.map(person => (
											<tr key={person.name}>
												<td className="whitespace-nowrap p-6 text-base text-[#44475B]">
													{person.name}
												</td>
												<td className="whitespace-nowrap p-6 text-base text-[#44475B]">
													<Switch
														checked={swtichStatus} // You might want to manage this state outside the table
														onChange={() => setSwtichStatus(!swtichStatus)}
														className="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#DFDFDF] transition-colors duration-200 ease-in-out focus:outline-none data-[checked]:bg-[#36DB83]">
														<span className="sr-only">Use setting</span>
														<span
															aria-hidden="true"
															className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
														/>
													</Switch>
												</td>
												<td className="whitespace-nowrap p-6 text-base text-[#44475B]">
													<button onClick={() => onDelete(person.name)}>
														<Trash className="w-6 h-6" />
													</button>
												</td>
											</tr>
									  ))
									: ''}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RemoteShareListTable;
