import { createSlice } from "@reduxjs/toolkit";

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

export const { updateLanguage } = changeLanguage.actions;
export default changeLanguage.reducer;