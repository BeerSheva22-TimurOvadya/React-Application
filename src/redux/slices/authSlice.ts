import {createSlice} from '@reduxjs/toolkit';
import UserData from '../../model/UserData';
const AUTH_ITEM = "auth-item";

const initialState: {user: UserData | null} = {
    user: JSON.parse(localStorage.getItem(AUTH_ITEM) || 'null')
  }
  const authSlice = createSlice({
      initialState,
      name: "authState",
      reducers: {
          set: (state, data) => {
              state.user = data.payload;
              localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload));
          },
          reset: (state) => {
              state.user = null;
              localStorage.removeItem(AUTH_ITEM);
          }
      }
  });
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;