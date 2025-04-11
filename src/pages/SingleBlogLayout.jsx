import React from "react";
import { useSelector } from "react-redux";

// pages
import { SingleBlog, BlogForm } from "./index";

// functions, data & store
import { blogs } from "../utils/blogsData";
import { getImagesLocal } from "../utils/index_local";
import { setRichTextEditorState } from "../features/blogs/blogsSlice";
import { setNumberOfImages } from "../features/images/imagesSlice";

// loader
export const loader =
	(store) =>
	async ({ params }) => {
		let blog;

		if (import.meta.env.VITE_SOURCE != "local") {
			const blogFirebase = await (
				await import("../utils")
			).getSingleBlog(params.id);
			blog = blogFirebase;
		} else {
			const blogsLocalStorage = JSON.parse(localStorage.getItem("blogsData"));

			if (blogsLocalStorage) {
				const blogLocal = blogsLocalStorage.find(
					(item) => item.id === params.id
				);
				blog = [blogLocal];
			} else {
				const blogLocal = blogs.find((item) => item.id === params.id);
				blog = [blogLocal];
			}
		}

		let numberOfImages;
		if (import.meta.env.VITE_SOURCE != "local") {
			const numberOfImagesFireStore = await (
				await import("../utils")
			).downloadImages(params.id);
			numberOfImages = numberOfImagesFireStore;
		} else {
			const images = getImagesLocal();
			numberOfImages = { numberOfImages: images[params.id].length };
		}
		store.dispatch(setNumberOfImages(numberOfImages));

		if (blog) {
			store.dispatch(
				setRichTextEditorState({ payload: blog[0]?.info, name: "info" })
			);
		}

		return {
			blog: blog ? blog : params.id === "new" ? [] : "invalid",
		};
	};

const SingleBlogLayout = () => {
	const { openForm } = useSelector((state) => state.blogsState);

	return <>{openForm ? <BlogForm /> : <SingleBlog />}</>;
};

export default SingleBlogLayout;
