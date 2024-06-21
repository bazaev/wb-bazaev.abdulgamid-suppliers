import React from 'react';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import style from './styles/app.module.css';
import icons from './styles/icons.module.css';
import useDevice from './hooks/useDevice';
import classNames from 'classnames';
import Router from './Components/Router';

const App = () => {

	const { isMobile } = useDevice();

	const sidebarBtnClassName = classNames(
		style.sidebarBtn,
		icons.icon,
		icons.logo
	)

	return (
		<div className={style.app}>
			{!isMobile
				? <button className={sidebarBtnClassName} />
				: <Header />
			}
			<div className={style.body}>
				{!isMobile && <Navigation />}
				<div className={style.page}>
					<Router />
				</div>
			</div>
		</div>
	)
}

export default App;