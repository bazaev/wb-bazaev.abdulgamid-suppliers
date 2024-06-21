import React, { memo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '../UI/Button';
import pages from '../utils/consts/pages';

import style from '../styles/Components/navigation.module.css';

const Seghments: React.FC = memo(() => {
	const navigate = useNavigate();

	const { pathname } = useLocation();

	return (
		<div className={style.navigation}>
			{pages.map((page) => (
				<Button
					key={page.name}
					color={pathname === page.name ? 'cloudy' : 'alpha'}
					onClick={() => navigate(page.name)}
				>
					{page.title}
				</Button>
			))}
		</div>
	)
})

export default Seghments;