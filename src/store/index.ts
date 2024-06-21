import { configureStore } from "@reduxjs/toolkit";
import citiesReducer, { citiesActions } from "./reducers/cities.reducer";
import warehousesReducer, { warehousesActions } from "./reducers/warehouses.reducer";
import suppliersReducer, { suppliersActions } from "./reducers/suppliers";


const store = configureStore({
	reducer: {
		cities: citiesReducer,
		warehouses: warehousesReducer,
		suppliers: suppliersReducer
	},
})

export const ActionCreators = {
	...citiesActions,
	...warehousesActions,
	...suppliersActions
}

export default store