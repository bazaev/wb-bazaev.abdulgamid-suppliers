import React, { useEffect, useState } from 'react';
import style from '../styles/Pages/suppliers.module.css';
import icon from '../styles/icons.module.css';
import Button from '../UI/Button';
import SearchField from '../Components/SearchField';
import useDevice from '../hooks/useDevice';
import SuppliersList from '../Components/SuppliersList';
import useActions from '../hooks/useActions';
import useSelector from '../hooks/useSelector';
import Loading from '../Components/Loading';
import SupplierAdd from '../Components/SupplierAdd';

const Suppliers: React.FC = () => {

	const { isMobile } = useDevice();

	const [addSupplier, setAddSupplier] = useState<boolean>(false);
	const [items, setItems] = useState([]);
	
	const { suppliers } = useSelector('suppliers');
	const { cities } = useSelector('cities');
	const { warehouses } = useSelector('warehouses');

	const {
		fetchSuppliers,
		fetchCities,
		fetchWarehouses
	} = useActions();

	useEffect(() => {
		if (!suppliers || !cities || !warehouses) {
			return
		}

		const items = (suppliers as any)?.map((supplier: any) => {
			const city = (cities as any).find((city: any) => city.id === supplier.city)
			const warehouse = (warehouses as any).find((warehouse: any) => warehouse.id === supplier.warehouse)
			
			return {
				...supplier,
				city,
				warehouse
			}
		})

		setItems(items)

	}, [suppliers, cities, warehouses]);

	useEffect(() => {
		if (!suppliers) {
			fetchSuppliers()
		} if (!cities) {
			fetchCities()
		} if (!warehouses) {
			fetchWarehouses()
		}
	}, [fetchSuppliers, fetchCities, fetchWarehouses, suppliers, cities, warehouses]);
	
	return (
		<div className={style.suppliers}>
			<div className={style.header}>
				<h1 className={style.header_title}>Поставки</h1>
				<Button className={style.add_delivery} color='alpha' onClick={() => setAddSupplier(true)}>
					<span className={`${style.add_btn} ${icon.icon} ${icon.plus}`} />
					{!isMobile && <span className={style.add_label}>Добавить поставку</span>}
				</Button>
				{!isMobile && <SearchField />}
			</div>

			{!suppliers
				? <Loading />
				: items.length ? <SuppliersList items={items} /> : <></>}

			{addSupplier && <SupplierAdd close={() => setAddSupplier(false)} />}
		</div>
	)
}

export default Suppliers;