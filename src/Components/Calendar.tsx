import React, { useEffect, useMemo, useState } from 'react';
import icon from '../styles/icons.module.css';
import IParams from '../types/Components/calendar';

import style from '../styles/Components/calendar.module.css';

const rows = 5;

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const Calendar: React.FC<IParams> = ({ onSelect, date }) => {

	const [selected, setSelected] = useState({
		day: date?.getDate() || 0,
		month: date?.getMonth() || 0,
		year: date?.getFullYear() || 0
	});
	
	const [currentDate, setCurrentDate] = useState(date || new Date());
	const [month, setMonth] = useState(currentDate.getMonth());
	const [days, setDays] = useState([]);
	const [prevDays, setPrevDays] = useState([]);

	const [ currentDay, currentMonth, currentYear ] = useMemo(() => {
		const date = new Date();
		return [date.getDate(), date.getMonth() + 1, date.getFullYear()];
	}, []) // eslint-disable-line

	const monthName = currentDate.toLocaleString('default', { month: 'long' });
	const year = currentDate.getFullYear();

	const prevDisabled = useMemo(() => (
		year === currentYear && month + 1 === currentMonth
	), [month, year, currentMonth, currentYear]);

	const increment = () => setMonth(month + 1);
	const decrement = () => setMonth(month - 1);

	const select = (day: number) => {
		onSelect?.(new Date(year, month, day));
		setSelected({
			day,
			month,
			year
		})
	}

	const isDisabled = (day: number) => {
		if (currentYear < year) {
			return false
		}else if (currentYear === year) {
			if (currentMonth < month + 1) {
				return false
			}else if (currentMonth === month + 1) {
				if (currentDay <= day) return false;
			}
		}
		return true
	};
	
	useEffect(() => {
		const newDate = new Date(currentYear, month + 1, 0);
		const daysInMonth = newDate.getDate();
		const daysInPreviousMonth = new Date(currentYear, month, 0).getDate();

		const cols = rows * 7;

		const previousMonthDaysCount = cols - daysInMonth;
		
		const lastPreviousMonthDays = new Array(daysInPreviousMonth)
									.fill(null)
									.map((_, i) => i + 1)
									.slice(daysInPreviousMonth - previousMonthDaysCount, daysInPreviousMonth);

		const daysCurrentMonth = new Array(daysInMonth)
								.fill(null)
								.map((_, i) => i + 1);

		setDays(daysCurrentMonth as any);
		setPrevDays(lastPreviousMonthDays as any);
		setCurrentDate(newDate);
	}, [month, currentYear]);
	
	return (
		<div className={style.calendar}>
			<div className={style.header}>
				<button className={`${style.button} ${icon.icon} ${icon.arrow_left}`} disabled={prevDisabled} onClick={decrement}></button>
				<div className={style.title}>
					{monthName} {year}
				</div>
				<button className={`${style.button} ${icon.icon} ${icon.arrow_right}`} onClick={increment}></button>
			</div>
			<div className={style.body}>
				{weekdays.map((day, key) => (
					<span
						className={`${style.day} ${style.week} ${key >= 5 ? style.weekend : ''}`}
						key={key}
					>{day}</span>
				))}
				{prevDays.map((day, key) => (
					<button
						key={key}
						className={style.dayBtn}
						disabled
					>
						<span className={style.day}>{day}</span>
					</button>
				))}
				{days.map((day, key) => (
					<button
						key={key}
						className={`${style.dayBtn} ${selected?.day === day && selected?.month === month && selected?.year === year ? style.selected : ''}`}
						disabled={isDisabled(day)}
						onClick={() => select(day)}
					>
						<span className={style.day}>{day}</span>
					</button>
				))}
			</div>
		</div>
	)
}

export default Calendar;