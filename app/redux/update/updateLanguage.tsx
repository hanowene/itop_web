import { createSlice, configureStore } from "@reduxjs/toolkit";

interface ChangeLanguage {
    language: string;
}

const initialState: ChangeLanguage = {
    language: "en",
}

const changeLanguage = createSlice({
    name: "changeLanguage",
    initialState,
    reducers: {
        updateLanguage: (state, action) => {
            console.log("state: ", state);
            state.language = "";
        }
    }   
})

export const makeStore = () => {
    return configureStore({
        reducer: {
            
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const { updateLanguage } = changeLanguage.actions;
export default changeLanguage.reducer;