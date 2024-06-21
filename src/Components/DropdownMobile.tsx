import React, { PropsWithChildren, useMemo } from 'react';
import classNames from 'classnames';
import IParams, { IDropdownMobile, IItemParams } from '../types/Components/dropdownMobile';

import style from '../styles/Components/dropdownMobile.module.css';
import icons from '../styles/icons.module.css';

const DropdownMobile: IDropdownMobile<PropsWithChildren<IParams>> = ({
	children,
	title,
	onClick,
	close,
	active
}) => {

	const Items = useMemo(() => {
		return React.Children.map(children, (child, key) => {
			if (React.isValidElement(child) && child?.type === DropdownMobile.Item) {
				return React.cloneElement(child as React.ReactElement, {
					onClick: ()=>onClick?.(key),
					active: active === key
				})
			}
		})
	}, [children, onClick, active])
	
	return (<>
		<div className={style.dropdown_mobile}>
			<button className={`${style.closeBtn} ${icons.icon} ${icons.close}`} />
			<h2 className={style.title}>{title}</h2>
			<div className={style.list}>
				{Items}
			</div>
		</div>
		<div className={style.cover} onClick={close} />
	</>
	)
}


const Item: React.FC<PropsWithChildren<IItemParams>> = ({ children, onClick, active }) => {

	const className = classNames(
		style.item,
		{
			[style.active]: active
		}
	)
	
	return (
		<div className={className} onClick={onClick}>
			<span className={style.text}>{children}</span>
			{active && <span className={`${style.icon} ${icons.icon} ${icons.check}`} />}
		</div>
	)
}

DropdownMobile.Item = Item;

export default DropdownMobile;