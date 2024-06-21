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
			async (supplier: any) => {
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
		),
		
		deleteSupplier: create.asyncThunk(
			async (id: any) => {
				return await fetch('/api/suppliers', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({id})
				}).then(r => r.json())
			},
			{				
				fulfilled: (state, action) => {
					if ("error" in action.payload) {
						state.error = action.payload.error
						return;
					}

					if (!state.suppliers?.length) return;
					
					const index = state.suppliers.findIndex((item) => item.id === action.meta.arg);
					if (index !== -1) {
						state.suppliers?.splice(index, 1);
					}
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