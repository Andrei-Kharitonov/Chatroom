import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";

interface UserState {
  currentUser: User,
  isRegistred: boolean
}

let defaultUser: User = {
  _id: '1',
  login: 'Anonim',
  password: '000000',
  post: 'none',
  banned: true
}

const initialState: UserState = {
  currentUser: defaultUser,
  isRegistred: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserFromLocalStorage: (state) => {
      let localStorageData: User | null = JSON.parse(localStorage.getItem('user')!);

      if (localStorageData) {
        state.currentUser = localStorageData;
        state.isRegistred = true;
      }
    },
    setUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.currentUser = action.payload;
      state.isRegistred = true;
    },
    setDefaultUser: (state) => {
      localStorage.removeItem('user');
      state.currentUser = defaultUser;
      state.isRegistred = false;
    }
  }
});

export const { getUserFromLocalStorage, setUser, setDefaultUser } = userSlice.actions;
export default userSlice.reducer;