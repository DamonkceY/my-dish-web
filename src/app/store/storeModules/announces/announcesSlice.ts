import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface AnnouncesState {
  mainHomeList: Array<any>;
  searchKeyword: string;
}

const initialState: AnnouncesState = {
  mainHomeList: [],
  searchKeyword: ''
}


export const announcesSlice = createSlice({
  name: 'announces',
  initialState,
  reducers: {
    setMainHomeAnnounces: (state, action: PayloadAction<any>) => {
      state.mainHomeList = action.payload
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload
    },
  },
})

export const { setMainHomeAnnounces, setSearchKeyword } = announcesSlice.actions

export const selectMainHomeAnnounces = (state: RootState) => state.announces.mainHomeList
export const selectSearchKeyword = (state: RootState) => state.announces.searchKeyword

export default announcesSlice.reducer
