import React, { useMemo } from 'react';
import IParams from '../types/Components/supplierList';
import Tag from '../UI/Tag';

import { EStatus, EType } from '../utils/enums/supplier';

import style from '../styles/Components/suppliersList.table.module.css'
import icons from '../styles/icons.module.css'

const SuppliersListTable: React.FC<IParams> = ({ items }) => {

	const supplierItems = useMemo(() => (
		items.map(item => (
			<tr key={item.id}>
				<td className={style.id}>
					<div className={style.value}>{item.id}</div>
				</td>
				<td className={style.date}>
					<div className={style.value}>{item.date}</div>
				</td>
				<td className={style.city}>
					<div className={style.value}>{item.city.name}</div>
				</td>
				<td className={style.quantity}>
					<div className={style.value}>{item.quantity} шт.</div>
				</td>
				<td className={style.type}>
					<div className={style.value}>{EType[item.type]}</div>
				</td>
				<td className={style.warehouse}>
					<div className={style.value}>{item.warehouse.name}</div>
					<div className={style.subValue}>{item.warehouse.address}</div>
				</td>
				<td className={style.status}>
					<Tag type={item.status ? 'success' : 'warning'}>
						{EStatus[item.status]}
					</Tag>
				</td>
				<td className={style.menu}>
					<button className={`${style.menuBtn} ${icons.icon} ${icons.kebab}`}></button>
				</td>
			</tr>
		))
	), [items])
	
	return (
		<table className={style.table} cellPadding={8}>
			<thead>
				<tr>
					<th>Номер</th>
					<th>Дата поставки</th>
					<th>Город</th>
					<th>Количество</th>
					<th>Тип поставки</th>
					<th>Склад</th>
					<th>Статус</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{supplierItems}
			</tbody>
		</table>
	)
}

export default SuppliersListTable;