import React, { memo } from 'react';
import style from '../styles/UI/button.module.css';
import { IParams } from '../types/UI/Button';
import classNames from 'classnames';

const Button: React.FC<React.PropsWithChildren<IParams>> = memo(({color, small, className, ...params}) => {

	const buttonClassName = classNames(
		style.button,
		color && style[color],
		className,
		{
			[style.small]: small
		}
	)
	
	return (
		<button
			{...params}
			className={buttonClassName}
		/>
	)
})

export default Button;