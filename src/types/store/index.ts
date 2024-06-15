import store from "../../store";

export type TRootState = ReturnType<typeof store.getState>

export type TReducer = keyof TRootState;