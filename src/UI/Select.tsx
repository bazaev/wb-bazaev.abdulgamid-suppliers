import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import useDevice from '../hooks/useDevice';
import { IParams } from '../types/UI/Select';

import DropdownMobile from '../Components/DropdownMobile';

import Dropdown from '../Components/Dropdown';

import style from '../styles/UI/select.module.css';
import icons from '../styles/icons.module.css';

const Select: React.FC<IParams> = ({ list = [], keyName, defaulValue = 0, onSelect, title }) => {

	const { isMobile } = useDevice();

	const selectRef = useRef(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selected, setSelected] = useState<number>(defaulValue);

	const onClickHandler = (key: number) => {
		setSelected(key)
		onSelect?.(key)
		close()
	};

	const close = () => setIsOpen(false);

	const value = keyName
		? list[selected]?.[keyName as any]
		: list[selected] || "";

	const iconsClassName = classNames(
		style.icon,
		icons.icon,
		{
			[icons.chevron_down]: !isOpen,
			[icons.chevron_top]: isOpen
		}
	)

	const Item = useMemo(()=>(isMobile
		? DropdownMobile.Item
		: Dropdown.Item
	), [isMobile])

	const dropDownItems = useMemo(() => (
		list.map((item, key) => (
			<Item
				key={key}
			>
				{keyName ? item[keyName as any] : item}
			</Item>
		))
	), [list, keyName, Item]);
	
	return (
		<div className={style.select}>
			<div ref={selectRef} className={style.field} onClick={() => setIsOpen(!isOpen)}>
				<div className={style.text}>{value}</div>
				<span className={iconsClassName} />
			</div>
			{isOpen && (
				isMobile
				? <DropdownMobile
					active={selected}
					title={title}
					onClick={onClickHandler}
					close={close}
				>
					{dropDownItems}
				</DropdownMobile>
				: <Dropdown
						onClick={onClickHandler}
						anchorRef={selectRef}
						close={close}
						fullWidth
					>
						{dropDownItems}
				</Dropdown>
			)}
		</div>)
}

export default Select;