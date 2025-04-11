import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import {
	Link,
	useLoaderData,
	useParams,
	useFetcher,
	useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// icons
import { FaEraser, FaCheck, FaPencil } from "react-icons/fa6";
import { TbArrowBackUp } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

// components
import {
	SectionTitle,
	FormInput,
	SubmitBtn,
	RichTextEditor,
	PhotosCarousel,
} from "../components/";

// utils & data & state
import { generateArrayOfSubstrings } from "../utils";
import { toolbar } from "../utils/data";
import {
	toggleForm,
	setRichTextEditorState,
} from "../features/blogs/blogsSlice";
import { setNumberOfImages } from "../features/images/imagesSlice";

export const action = async () => {
	return null;
};

const BlogForm = () => {
	const [imageList, setImageList] = useState();
	const [newlySelectedImages, setNewlySelectedImages] = useState([]);

	const params = useParams();
	const fetcher = useFetcher();
	const { blog } = useLoaderData();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const info = useSelector((state) => state.blogsState.richTextEditorInfo);
	const user = useSelector((state) => state.userState.user?.email);
	const { numberOfImages } = useSelector((state) => state.imagesState);

	let blogDetails = null;

	// fetch data from FORM ACTION
	// useEffect used to avoid multiple re-renders (multiple blogs added/updated)
	useEffect(() => {
		if (fetcher.formData) {
			// prepare blog details data
			const title = fetcher.formData?.get("title");
			// const alt = fetcher.formData?.get("alt");
			// const src = fetcher.formData?.get("src");

			const substrings = generateArrayOfSubstrings(title);

			blogDetails = {
				...blogDetails,
				author: user,
				date: new Date(),
				title: title,
				titleArray: substrings,
				info: info.payload,
			};

			// ADD || UPDATE BLOG IN DATABASE && UPLOAD IMAGES TO STORAGE
			if (import.meta.env.VITE_SOURCE != "local") {
				import("../utils")
					.handleFormData(params.id, blogDetails, imageList)
					.then((item) => {
						// console.log(params.id);
						// console.log(blogDetails);
						// console.log(imageList);
						// console.log(item);

						if (item.finished === "finished") {
							setTimeout(() => {
								const numberOfImages = params.id;
								numberOfImages.then((item) => {
									dispatch(
										setNumberOfImages({ numberOfImages: item.numberOfImages })
									);
								});
							}, 1000);
							navigate("/blogs");
						}
					});
			} else {
				const author = JSON.parse(localStorage.getItem("user"));
				const blogs = JSON.parse(localStorage.getItem("blogsData"));

				if (params.id === "new") {
					// ADD NEW BLOG
					const blogDetailsLocal = {
						...blogDetails,
						id: uuidv4(),
						author: author.email,
					};
					const addedBlog = [...blogs, blogDetailsLocal];
					localStorage.setItem("blogsData", JSON.stringify(addedBlog));
					navigate("/blogs");
				} else {
					// UPDATE EXISTING BLOG
					const updatedBlogs = blogs.map((searchBlog) => {
						if (searchBlog.id === blog[0].id) {
							return {
								...searchBlog,
								date: new Date(),
								title: title,
								titleArray: substrings,
								info: info.payload,
							};
						} else {
							return searchBlog;
						}
					});

					localStorage.setItem("blogsData", JSON.stringify(updatedBlogs));
					navigate("/blogs");
				}
			}
		}
	}, [fetcher.formData]);

	// Handle Preview of images on page
	useEffect(() => {
		if (imageList) {
			if (imageList && imageList.length != 0) {
				Array.from(imageList).map((file) => {
					const url = URL.createObjectURL(file);
					readAndPreview(file, url);
				});
			}
		}
	}, [imageList]);

	// Handle Rich Text Editor State
	const handleChange = ({ payload, name }) => {
		dispatch(setRichTextEditorState({ payload, name }));
	};

	// Handle input files
	const handleFilesChange = (e) => {
		let files = e.target.files;
		setImageList(files);
	};

	// preview images
	const readAndPreview = (file, url) => {
		let imgObj = {};
		imgObj.src = url;
		imgObj.alt = file.name;
		imgObj.name = file.name;
		newlySelectedImages.push(imgObj);
		setNewlySelectedImages([...newlySelectedImages]);
	};

	// handle REMOVE of newly added IMAGE
	const handleRemoveImage = (index) => {
		setNewlySelectedImages([]);
		const dt = new DataTransfer();

		for (let i = 0; i < imageList.length; i++) {
			const file = imageList[i];
			if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
		}

		setImageList(dt.files);
	};

	return (
		<main>
			<section className="section">
				<div className="align-element">
					{/* FORM TITLE */}
					<SectionTitle
						text={
							blog.length === 0 ? "Create new blog" : "Update existing blog"
						}
						className="mb-16"
					/>

					{/* FORM */}
					<fetcher.Form
						className="bg-base-200 rounded-lg px-8 py-4 grid gap-x-4 gap-y-8 items-center blog-form"
						method="POST"
					>
						{/* TITLE */}
						<FormInput
							type="text"
							label="Name of the blog"
							name="title"
							defaultValue={blog[0]?.title}
							placeholder="Name of the blog"
							className="input-1"
							inputClassName="bg-slate-100 text-black"
							svg={<FaPencil className="text-slate-400" />}
						/>

						{/* INFO */}
						<RichTextEditor
							mainClassName="input-2"
							wrapperClassName="wrapper-class"
							editorClassName="editor-class"
							toolbarClassName="toolbar-class"
							readOnly={false}
							label={true}
							toolbar={toolbar}
							onChange={handleChange}
							defaultValue={blog[0]?.info}
						/>

						{/* IMAGE UPLOAD */}
						<input
							id="images"
							type="file"
							name="images"
							multiple
							onChange={handleFilesChange}
							className="input-3 mt-8 file-input file-input-bordered w-full max-w-xs"
						/>

						{/* Output IMAGE */}
						{newlySelectedImages && (
							<div className="input-4 grid grid-cols-1">
								{newlySelectedImages.map((image, i) => {
									return (
										<div
											key={i}
											className="grid grid-cols-[150px_auto] gap-2 py-2 relative"
										>
											<img
												src={image.src}
												alt={image.alt}
												className="max-w-32 max-h-32 object-cover object-center"
											/>
											<p key={i} className="h-full flex items-center">
												{image.name}
											</p>
											<div
												className="absolute top-6 right-2 cursor-pointer hover:scale-150 hover:text-red-700 transition-all duration-300"
												onClick={() => {
													handleRemoveImage(i);
												}}
											>
												<IoMdClose />
											</div>
										</div>
									);
								})}
							</div>
						)}

						{/* PHOTOS */}
						<div className="input-5">
							{numberOfImages.numberOfImages > 0 && (
								<div className="text-sm pt-8 pb-2">
									Already added photos to the blog:
								</div>
							)}
							<PhotosCarousel type={"blogForm"} />
						</div>

						{/* BUTTONS */}
						<div className="input-6 mt-8 flex justify-end gap-4">
							{/* CONFIRM */}
							<button type="submit" className="btn-small-primary">
								<FaCheck />
							</button>
							<div className="w-20 hidden md:flex">
								<SubmitBtn
									formId={imageList}
									text="Submit Changes"
									className="btn-normal btn-primary capitalize"
								/>
							</div>

							{/* DELETE INPUTS */}
							<div className="btn-small-error">
								<FaEraser />
							</div>
							<div
								className="btn-normal btn-accent capitalize"
								onClick={() => {
									navigate(`/blogs/${blog[0].id}`);
								}}
							>
								Discard Changes
							</div>

							{/* SPAT */}
							<Link
								to="/blogs"
								className="btn-small-accent"
								onClick={() => dispatch(toggleForm(false))}
							>
								<TbArrowBackUp />
							</Link>
							<Link
								to={`/blogs`}
								className="btn-normal"
								onClick={() => dispatch(toggleForm(false))}
							>
								Back
							</Link>
						</div>
					</fetcher.Form>
				</div>
			</section>
		</main>
	);
};

export default BlogForm;
