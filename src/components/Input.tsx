import './Input.css';
import React, { useState } from 'react';

type InputProps = {
	inputValue: string;
	setInputValue: (value: string) => void;
};

export default function Input({ inputValue, setInputValue }: InputProps) {
	const [localInputValue, setLocalInputValue] = useState(inputValue);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalInputValue(e.currentTarget.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setInputValue(localInputValue);
		}
	};

	return (
		<div className='input'>
			<input
				type='text'
				placeholder='Enter a username'
				value={localInputValue}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
}
