import * as React from 'react';

import { cn } from '@/lib/utils';
import { CopyIcon, EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	hasError?: boolean;
}

const commonClasses = `rounded-[8px] border border-[#C4C7E3]`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, hasError, label, type, ...props }, ref) => {
	return (
		<div className="flex flex-col gap-2 mt-2">
			{label && <label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">{label}</label>}
			<input
				type={type}
				className={cn(
					'border rounded-[8px] text-[#44475B] px-6 py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] focus:border-[#298DFF]',
					hasError ? 'border-[#EB7B71] focus:border-[#EB7B71]' : 'border-[#C4C7E3]',
					commonClasses,
					className
				)}
				ref={ref}
				{...props}
			/>
		</div>
	);
});

// const InputWithCharacterCounter = React.forwardRef<HTMLInputElement, InputProps>(
// 	({ className, label, type, maxLength,hasError, ...props }, ref) => {
// 		const [text, setText] = React.useState('');
// 		console.log(text,"text")
// 		return (
// 			<div className="w-full">
// 				<div className="relative">
// 					<input
// 						value={text}
// 						onChange={e => setText(e.target.value)}
// 						maxLength={maxLength}
// 						className={cn(
// 							'border rounded-[8px] px-6 text-[#44475B] py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] focus:border-[#298DFF]',
// 							hasError ? 'border-[#EB7B71] focus:border-[#EB7B71]' : 'border-[#C4C7E3]',
// 							commonClasses,
// 							className
// 						)}
// 						{...props}
// 					/>
// 					<div className="absolute bottom-[-12px] right-3 text-xs text-gray-400 bg-white px-1 py-1 rounded-md">
// 						{text.length}/{maxLength}
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// );
const InputWithCharacterCounter = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, maxLength, hasError, value, onChange, ...props }, ref) => {
		return (
			<div className="w-full">
				<div className="relative">
					<input
						value={value} // Use the value prop from the parent
						onChange={onChange} // Use the onChange prop from the parent
						maxLength={maxLength}
						type={type}
						className={cn(
							'border rounded-[8px] px-6 text-[#44475B] py-3 outline-none block w-full shadow-base ring-0 placeholder:text-[#A3A09F] focus:border-[#298DFF]',
							hasError ? 'border-[#EB7B71] focus:border-[#EB7B71]' : 'border-[#C4C7E3]',
							className
						)}
						{...props}
					/>
					<div className="absolute bottom-[-12px] right-3 text-xs text-gray-400 bg-white px-1 py-1 rounded-md">
						{value?.length}/{maxLength} {/* Display length of the value prop */}
					</div>
				</div>
			</div>
		);
	}
);

Input.displayName = 'Input';

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, type, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<>
			{label && <label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">{label}</label>}
			<div className="relative">
				<Input className="h-12 pr-12" type={showPassword ? 'text' : 'password'} {...props} />
				<span
					onClick={() => setShowPassword(!showPassword)}
					
					className="absolute cursor-pointer  inset-y-0 right-0 pr-5 flex items-center">
					{showPassword ? <EyeOff color="#8F92A6" /> : <Eye color="#8F92A6" />}
				</span>
			</div>
		</>
	);
});
const InputWithCopy = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, type, ...props }, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<>
			{label && <label className="block text-base mb-3 font-medium leading-6 text-[#44475B]">{label}</label>}
			<div className="relative bg-[#EBF3FF] rounded-[8px]" style={{ background: '#EBF3FF' }}>
				<Input className="h-12 text-md" type={'text'} {...props} />
				<button
					onClick={() => setShowPassword(!showPassword)}
					type="button"
					className="absolute inset-y-0 right-0 pr-3 flex items-center">
					<CopyIcon />
				</button>
			</div>
		</>
	);
});

export { Input, InputPassword, InputWithCopy, InputWithCharacterCounter };
