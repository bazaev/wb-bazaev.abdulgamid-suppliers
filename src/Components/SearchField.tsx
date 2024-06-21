import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';
import suppliersSearchKeyItems from '../utils/consts/suppliers.searchKeyItems';

import style from '../styles/Components/searchField.module.css';
import icon from '../styles/icons.module.css';

let onInputInterval: NodeJS.Timer;

const SortSearchField: React.FC = memo(() => {
	
	const anchorRef = useRef(null);

	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [searchKeyItem, setSearchKeyItem] = useState(suppliersSearchKeyItems[0]);
	const [searchText, setSearchText] = useState();

	const buttonClassname = classNames(
		style.button,
		{
			[style.active]: isOpenDropdown
		}
	)

	const buttonIconClassname = classNames(
		style.button_icon,
		icon.icon,
		{
			[icon.chevron_top]: isOpenDropdown,
			[icon.chevron_down]: !isOpenDropdown
		}
	)

	const searchIconClassname = classNames(
		style.search_icon,
		icon.icon,
		icon.search
	)

	const searchOnInput = ({ target }: any) => {
		if (onInputInterval) clearInterval(onInputInterval)
		
		onInputInterval = setInterval(() => setSearchText(target.value), 200)
	}

	const itemOnClick = (key: number) => {
		const item = suppliersSearchKeyItems[key];
		setIsOpenDropdown(false)
		setSearchKeyItem(item)
	}

	const dropdownItems = useMemo(() => (
		suppliersSearchKeyItems.map((item) => (
			<Dropdown.Item
				key={item.key}
				>
					{item.title}
				</Dropdown.Item>
		))
	), []);

	useEffect(() => {
		// console.log(searchText)
	}, [searchText]);

	return (<>
		<div className={style.field}>
			<button
				ref={anchorRef}
				className={buttonClassname}
				onClick={()=>setIsOpenDropdown(true)}
			>
				{searchKeyItem.title}
				<span className={buttonIconClassname} />
			</button>
			<label className={style.search_form}>
				<input
					type="text"
					placeholder='Поиск...'
					className={style.search_input}
					onInput={searchOnInput}
					/>
				<span className={searchIconClassname} />
			</label>
		</div>
		{isOpenDropdown && <Dropdown
			onClick={itemOnClick}
			anchorRef={anchorRef}
			close={() => setIsOpenDropdown(false)}
		>
			{dropdownItems}
		</Dropdown>}
	</>)
})

export default SortSearchField;