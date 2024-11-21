import { useState, useEffect, useRef, ReactNode } from 'react';

interface DropdownProps {
	button: ReactNode;
	children: ReactNode;
	onClose?: () => void;
	onToggle?: (isOpen: boolean) => void; // Callback to notify open/close state
}

const Dropdown = ({ button, children, onClose, onToggle }: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				onClose?.();
				onToggle?.(false); // Notify parent that the dropdown is closed
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [onClose, onToggle]);

	const toggleDropdown = () => {
		const newState = !isOpen;
		setIsOpen(newState);
		onToggle?.(newState); // Notify parent of the new state
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Dropdown Button */}
			<div onClick={toggleDropdown}>{button}</div>

			{/* Dropdown Content */}
			{isOpen && <div className="absolute left-0 right-0 z-50">{children}</div>}
		</div>
	);
};

export default Dropdown;
