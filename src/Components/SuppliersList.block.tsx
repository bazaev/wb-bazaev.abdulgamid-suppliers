import React, { useMemo } from 'react';
import classNames from 'classnames';
import Tag from '../UI/Tag';

import IParams from '../types/Components/supplierList';

import { EStatus } from '../utils/enums/supplier';

import style from '../styles/Components/suppliersList.block.module.css';
import icons from '../styles/icons.module.css';

const SuppliersListBlock: React.FC<IParams> = ({ items }) => {

	const editIconClassName = classNames(
		style.edit_icon,
		icons.icon,
		icons.edit,
	)

	const supplierItems = useMemo(() => (
			items.map((item: any) => (
				<div className={style.item} key={item.id}>
					<div className={style.number}>
						<div className={style.title}>Номер</div>
						<div className={style.content}>{String(item.id).padStart(6, '0')}</div>
					</div>
					<div className={style.date}>
						<div className={style.title}>Дата доставки</div>
						<div className={style.content}>{item.date}</div>
					</div>
					<div className={style.status}>
						<Tag type={item.status ? 'success' : 'warning'}>
							{EStatus[item.status]}
						</Tag>
					</div>
					<div className={style.edit}>
						<button className={editIconClassName} />
					</div>
				</div>
			))
	), [items, editIconClassName])
	
	return (
		<div className={style.suppliersList}>
			{supplierItems}
		</div>
	)
}

export default SuppliersListBlock;