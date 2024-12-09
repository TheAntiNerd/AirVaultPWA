import * as React from 'react';
import { X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';

export function MultiSelectInput({ options = [], placeholder = 'Search roles...' }: any) {
	const [selected, setSelected] = React.useState<typeof options>([]);
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState('');

	const handleSelect = (option: (typeof options)[0]) => {
		const isSelected = selected.some((item: any) => item.value === option.value);
		if (!isSelected) {
			setSelected([...selected, option]);
		}
		setInputValue('');
		setOpen(false);
	};

	const handleRemove = (optionValue: string) => {
		setSelected(selected.filter((item: any) => item.value !== optionValue));
	};

	const commandRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative" ref={commandRef}>
			<div
				className="border rounded-[8px] p-2 flex flex-wrap gap-2 min-h-[42px] cursor-pointer"
				onClick={() => setOpen(true)}>
				{selected.map((option: any) => (
					<Badge key={option.value} variant="secondary" className="h-8 border border-[#C4C7E3] rounded-[8px]">
						{option.label}
						<button
							className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
							onKeyDown={e => {
								if (e.key === 'Enter') {
									handleRemove(option.value);
								}
							}}
							onMouseDown={e => {
								e.preventDefault();
								e.stopPropagation();
							}}
							onClick={e => {
								e.stopPropagation();
								handleRemove(option.value);
							}}>
							<X className="h-3 w-3" />
						</button>
					</Badge>
				))}
			</div>
			{open && (
				<div className="absolute top-[100%] w-full mt-2 z-50">
					<Command className="rounded-lg border shadow-md bg-white">
						<CommandInput placeholder={placeholder} value={inputValue} onValueChange={setInputValue} />
						<CommandList>
							<CommandEmpty>No roles found.</CommandEmpty>
							<CommandGroup>
								{options
									.filter((option: any) => !selected.some((item: any) => item.value === option.value))
									.map((option: any) => (
										<CommandItem
											key={option.value}
											value={option.value}
											onSelect={() => handleSelect(option)}
											className="cursor-pointer">
											{option.label}
										</CommandItem>
									))}
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			)}
		</div>
	);
}
