import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import searchSlice from "../slices/searchSlice";
import saga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        searches: searchSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;