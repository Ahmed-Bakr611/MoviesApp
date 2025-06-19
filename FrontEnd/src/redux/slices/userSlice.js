// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  password: "",
  country: "",
  gender: "",
  skills: [],
  comment: "",
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        userName,
        email,
        password,
        country,
        gender,
        skills,
        comment,
      } = action.payload;

      state.userName = userName;
      state.email = email;
      state.password = password;
      state.country = country;
      state.gender = gender;
      state.skills = skills;
      state.comment = comment;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload ?? true;
    },
  },
});

export default userSlice.reducer;
export const { setUser, setIsAuth } = userSlice.actions;
