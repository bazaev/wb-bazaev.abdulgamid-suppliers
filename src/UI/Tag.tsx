import React, { memo } from 'react';
import style from '../styles/UI/tag.module.css';
import classNames from 'classnames';
import { IParams } from '../types/UI/Tag';

const Tag: React.FC<React.PropsWithChildren<IParams>> = memo(({ children, type}) => {

	const className = classNames(
		style.tag,
		type && style[type]
	)

	return (
		<div className={className}>
			{children}
		</div>
	)
})

export default Tag;