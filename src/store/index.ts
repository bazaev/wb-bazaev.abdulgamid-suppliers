import { configureStore } from "@reduxjs/toolkit";
import citiesReducer, { citiesActions } from "./reducers/cities.reducer";
import warehousesReducer, { warehousesActions } from "./reducers/warehouses.reducer";


const store = configureStore({
	reducer: {
		cities: citiesReducer,
		warehouses: warehousesReducer
	},
})

export const ActionCreators = {
	...citiesActions,
	...warehousesActions
}

export default store