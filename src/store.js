import { configureStore, createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "route",
  initialState: { value: { url: "/preferences" } },
  reducers: {
    navigate: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: { value: { userId: "" } },
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { navigate } = routeSlice.actions;
export const { login } = userSlice.actions;

export const store = configureStore({
  reducer: {
    route: routeSlice.reducer,
    user: userSlice.reducer,
  },
});
