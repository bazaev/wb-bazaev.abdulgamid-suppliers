import { IInitialState, IAction } from "../../types/store/reducers/cities.reducer";
import { createThunkSlice } from "../createThunkSlice";

const initialState: IInitialState = {
	cities: undefined,
	loading: false,
	error: undefined
}

const citiesSlice = createThunkSlice({
	name: "cities",
	initialState,
	reducers: create => ({
		fetchCities: create.asyncThunk(
			async () => {
				return await fetch('/api/cities').then(r => r.json())
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
					state.cities = action.payload;
				},

				rejected: (state, action) => {
					state.loading = false;
					state.error = action.error.message;
				}
			}
		)
	})
});

export const citiesActions = citiesSlice.actions;

export default citiesSlice.reducer