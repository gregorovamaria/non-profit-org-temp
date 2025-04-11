import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	src: null,
	index: null,
	allImages: [],
	numberOfImages: null,
};

const imagesSlice = createSlice({
	name: "images",
	initialState,
	reducers: {
		setImageAttributes: (state, action) => {
			state.src = action.payload.src;
			state.index = action.payload.index;
		},
		setImages: (state, action) => {
			state.allImages = action.payload;
		},
		setNumberOfImages: (state, action) => {
			state.numberOfImages = action.payload;
		},
	},
});

export const { setImageAttributes, setImages, setNumberOfImages } =
	imagesSlice.actions;

export default imagesSlice.reducer;
