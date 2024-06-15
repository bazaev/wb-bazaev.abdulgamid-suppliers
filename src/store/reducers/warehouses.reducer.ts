import { IAction, IInitialState } from "../../types/store/reducers/warehouses.reducer";
import { createThunkSlice } from "../createThunkSlice";

const initialState: IInitialState = {
	warehouses: undefined,
	loading: false,
	error: undefined
}

const warehousesSlice = createThunkSlice({
	name: "warehouses",
	initialState,
	reducers: create => ({
		fetchWarehouses: create.asyncThunk(
			async () => {
				return await fetch('/api/warehouses').then(r => r.json())
			},
			{
				pending: (state) => {
					state.loading = true;
					state.error = undefined;
				},
				
				fulfilled: (state, action: IAction) => {
					state.loading = false;
					if ("error" in action.payload) {
						state.error = action.payload.error
						return;
					}
					state.warehouses = action.payload;
				},

				rejected: (state, action) => {
					state.loading = false;
					state.error = action.error.message;
				}
			}
		)
	})
});

export const warehousesActions = warehousesSlice.actions;

export default warehousesSlice.reducer