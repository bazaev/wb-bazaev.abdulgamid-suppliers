import React, { PropsWithChildren, useMemo } from 'react';
import IParams, { IDropdown, IItemParams } from '../types/Components/dropdown';
import Layer from './Layer';

import style from '../styles/Components/dropdown.module.css';

const Dropdown: IDropdown<PropsWithChildren<IParams>> = ({
	onClick,
	children,
	anchorRef,
	align,
	fullWidth,
	close
}) => {

	const Items = useMemo(() => {
		return React.Children.map(children, (child, key) => {
			if (React.isValidElement(child) && child?.type === Dropdown.Item) {
				return React.cloneElement(child as React.ReactElement, {
					onClick: ()=>onClick?.(key)
				})
			}
		})
	}, [children, onClick])
	
	return (
		<Layer
			anchorRef={anchorRef}
			align={align}
			fullWidth={fullWidth}
			close={close}
		>
			<div className={style.dropdown}>
				{Items}
			</div>
		</Layer>
	)
}


const Item: React.FC<PropsWithChildren<IItemParams>> = ({ children, onClick }) => {
	return (
		<div className={style.item} onClick={onClick}>{children}</div>
	)
}

Dropdown.Item = Item;

export default Dropdown;