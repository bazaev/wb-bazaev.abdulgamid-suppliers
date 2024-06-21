import React from 'react';
import useDevice from '../hooks/useDevice';
import SuppliersListBlock from './SuppliersList.block';
import SuppliersListTable from './SuppliersList.table';

import IParams from '../types/Components/supplierList';

const SuppliersList: React.FC<IParams> = ({ items }) => {

	const { isMobile } = useDevice();

	return (<>
		{isMobile ? <SuppliersListBlock items={items} /> : <SuppliersListTable items={items} />}
	</>
	)
}

export default SuppliersList;