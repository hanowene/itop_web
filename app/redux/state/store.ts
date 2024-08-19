import { configureStore } from "@reduxjs/toolkit"
import changeLanguageReducer from "../update/updateLanguage"

export const store = configureStore({
    reducer: {
        changeLanguage: changeLanguageReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//         changeLanguage: changeLanguageReducer,
//     }
//   })
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']