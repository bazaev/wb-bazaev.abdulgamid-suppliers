import React, { useMemo, useRef, useState } from 'react';
import Layer from '../Components/Layer';

import style from '../styles/UI/inputDate.module.css';
import icons from '../styles/icons.module.css';
import IParams from '../types/UI/InputDate';
import Calendar from '../Components/Calendar';

const InputDate: React.FC<IParams> = ({ onInput }) => {

	const anchorRef = useRef(null);
	
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date>();
	const [value, setValue] = useState("");

	const close = () => setIsOpen(false);

	const onSelect = (date: Date) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		const value = `${day}.${month}.${year}`;

		setValue(value);
		onInput?.(value);
		setDate(date);
		close();
	}
	
	return (<>
		<div ref={anchorRef} className={style.input_date}>
			<input type="text" disabled placeholder='__.__.____' className={style.input} defaultValue={value} />
			<button className={`${style.pickerBtn} ${icons.icon} ${icons.cal}`} onClick={() => setIsOpen(!isOpen)} />
		</div>
		{isOpen && <Layer
			anchorRef={anchorRef}
			align='right'
			close={close}
		>
			<Calendar onSelect={onSelect} date={date} />
		</Layer>}
	</>
	)
}

export default InputDate;