import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userIdFromLocalStorage =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
const tokenFromLocalStorage = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialStateWithLocalStorage = {
    userId: userIdFromLocalStorage ? userIdFromLocalStorage : null,
    token: tokenFromLocalStorage ? tokenFromLocalStorage : null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialStateWithLocalStorage, // Start with state from localStorage (if any)
    reducers: {
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("userId", action.payload);
            }
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            if (typeof window !== "undefined") {
                localStorage.setItem("token", action.payload);
            }
        },
        clearUserId(state) {
            state.userId = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("userId");
            }
        },
        clearToken(state) {
            state.token = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
        },
    },
});

export const { setUserId, setToken, clearUserId, clearToken } = userSlice.actions;

export default userSlice.reducer;
