import React from 'react';

import style from '../styles/UI/inputNumber.module.css';

interface IParams {
	value?: number
	onInput?: (value: number) => void
}

const InputNumber: React.FC<IParams> = ({ value = 0, onInput }) => {
	return (
		<div className={style.input_number}>
			<input
				type="number"
				defaultValue={value}
				className={style.input}
				onInput={({ target }: any) => onInput?.(target.value)}
			/>
			<span className={style.unit}>шт.</span>
		</div>
	)
}

export default InputNumber;