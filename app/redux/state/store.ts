import { configureStore } from "@reduxjs/toolkit"
import changeLanguageReducer from "../update/updateLanguage"

export const store = configureStore({
    reducer: {
        changeLanguage: changeLanguageReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
