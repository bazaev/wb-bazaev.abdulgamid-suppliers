import { useSelector as reduxSelector } from "react-redux"
import { TReducer, TRootState } from "../types/store";

const useSelector = (reducer: TReducer) => <TRootState> reduxSelector<TRootState>(state => state[reducer])

export default useSelector;