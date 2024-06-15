import redux from "react-redux"
import { IReducer, IRootState } from "../types/store";

const useSelector = (reducer: IReducer) => redux.useSelector<IRootState>(state => state[reducer])

export default useSelector;