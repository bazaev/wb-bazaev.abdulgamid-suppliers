import React, { useEffect, useRef, useState } from 'react';

import Button from '../UI/Button';
import Select from '../UI/Select';
import InputDate from '../UI/InputDate';
import InputNumber from '../UI/InputNumber';

import useSelector from '../hooks/useSelector';
import useActions from '../hooks/useActions';
import useDevice from '../hooks/useDevice';

import { ICity } from '../types/store/reducers/cities.reducer';
import { IWarehouse } from '../types/store/reducers/warehouses.reducer';

import IProps from '../types/Components/supplierAdd';
import style from '../styles/Components/supplierAdd.module.css';
import icons from '../styles/icons.module.css';

const SupplierAdd: React.FC<IProps> = ({ close }) => {

	const { isMobile } = useDevice();
	
	const quantity = useRef<number>(0);
	const date = useRef<string>('');
	const type = useRef<number>(0);
	const warehouse = useRef<number>(1);
	const status = useRef<number>(0);
	const city = useRef<number>(1);

	const { suppliers } = useSelector('suppliers');
	const { cities = [] } = useSelector('cities');
	const { warehouses = [] } = useSelector('warehouses');

	const {
		fetchCities,
		fetchWarehouses,
		addSupplier
	} = useActions();

	const create = async () => {
		addSupplier({
			id: (suppliers as any).length + 1,
			city: city.current,
			quantity: quantity.current,
			date: date.current,
			type: type.current,
			warehouse: warehouse.current,
			status: status.current
		});
		close();
	}

	useEffect(() => {
		if (!cities) {
			fetchCities()
		} if (!warehouses) {
			fetchWarehouses()
		}
	}, [fetchCities, fetchWarehouses, cities, warehouses]);
	
	return (
		<div className={style.supplier_add}>
			<div className={style.cover} onClick={close} />
			<div className={style.supplier_container}>
				<button className={`${style.closeBtn} ${icons.icon} ${icons.close}`} onClick={close} />
				<div className={style.body}>
					<div className={style.header}>
						<h2 className={style.title}>Новая поставка</h2>
						<div className={style.number}>#000001</div>
					</div>
					<div className={style.form}>
						<label className={style.label}>
							<span className={style.label_title}>Дата поставки</span>
							<InputDate
								onInput={value => date.current = value}
							/>
						</label>
						<label className={style.label}>
							<span className={style.label_title}>Город</span>
							<Select
								title="Город"
								list={cities as ICity[]}
								keyName="name"
								onSelect={key => city.current = (cities as ICity[])[key].id}
							/>
						</label>
						<label className={style.label}>
							<span className={style.label_title}>Количество</span>
							<InputNumber
								value={quantity.current}
								onInput={value => quantity.current = value} />
						</label>
						<label className={style.label}>
							<span className={style.label_title}>Тип поставки</span>
							<Select
								title="Тип поставки"
								list={['Короб', 'Монопаллета']}
								onSelect={value => type.current = value} />
						</label>
						<label className={style.label}>
							<span className={style.label_title}>Склад</span>
							<Select
								title="Склад"
								list={warehouses as IWarehouse[]}
								keyName="name"
								onSelect={(value) => warehouse.current = (warehouses as IWarehouse[])[value].id} />
						</label>
						<label className={style.label}>
							<span className={style.label_title}>Статус</span>
							<Select
								title="Статус"
								list={['Задерживается', 'В пути']}
								onSelect={value => status.current = value} />
						</label>
					</div>
				</div>
				<div className={style.footer}>
					<Button color='primary' onClick={create}>Создать</Button>
					{!isMobile && <Button color='alpha' onClick={close}>Отменить</Button>}
				</div>
			</div>
		</div>
	)
}

export default SupplierAdd;