import React from 'react';

import style from '../styles/Components/loading.module.css';

const Loading: React.FC = () => {
	return (
		<h3 className={style.loading}>
			Загрузка...
		</h3>
	)
}

export default Loading;