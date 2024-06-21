import React, { memo } from 'react';
import style from '../styles/Components/header.module.css';
import icons from '../styles/icons.module.css';
import classNames from 'classnames';
import useActions from '../hooks/useActions';

const Header: React.FC = memo(() => {

	const { fetchSuppliers } = useActions();

	const actionButtonClassName = classNames(
		style.actionButton,
		icons.icon
	)
	
	return (
		<div className={style.header}>
			<button className={`${actionButtonClassName} ${icons.menu}`}></button>
			<span className={`${style.logo} ${icons.icon} ${icons.logo}`} />
			<div className={style.actions}>
				<button className={`${actionButtonClassName} ${icons.log}`} onClick={fetchSuppliers}></button>
				<button className={`${actionButtonClassName} ${icons.doc}`}></button>
			</div>
		</div>
	)
})

export default Header;