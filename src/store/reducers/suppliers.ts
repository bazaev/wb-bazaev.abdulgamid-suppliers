import { IInitialState, IAction } from "../../types/store/reducers/suppliers.reducer";
import { createThunkSlice } from "../createThunkSlice";

const initialState: IInitialState = {
	suppliers: undefined,
	loading: false,
	error: undefined
}

const suppliersSlice = createThunkSlice({
	name: "suppliers",
	initialState,
	reducers: create => ({
		fetchSuppliers: create.asyncThunk(
			async () => {
				return await fetch('/api/suppliers').then(r => r.json())
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
					state.suppliers = action.payload;
				},

				rejected: (state, action) => {
					state.loading = false;
					state.error = action.error.message;
				}
			}
		),
		
		addSupplier: create.asyncThunk(
			async (supplier: any, ...q) => {
				console.log(supplier);
				return await fetch('/api/suppliers', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(supplier)
				}).then(r => r.json())
			},
			{				
				fulfilled: (state, action) => {
					console.log(action)
					if ("error" in action.payload) {
						state.error = action.payload.error
						return;
					}
					state.suppliers?.unshift(action.meta.arg);
				},

				rejected: (state, action) => {
					state.loading = false;
					state.error = action.error.message;
				}
			}
		)
	})
});

export const suppliersActions = suppliersSlice.actions;

export default suppliersSlice.reducer