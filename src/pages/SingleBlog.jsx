import React, { useEffect } from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import { SectionTitle, RichTextEditor, PhotosCarousel } from "../components";
import { BlogForm } from "../pages";

// functions,  data & store
import { themes, teamMembers } from "../utils/data";
import { openModal } from "../features/modal/modalSlice";
import { toggleForm } from "../features/blogs/blogsSlice";

// images
import avatarFemale from "../../pictures/avatar/undraw_female_avatar.svg";
import avatarFemaleDark from "../../pictures/avatar/undraw_female_avatar-dark.svg";
import avatarMale from "../../pictures/avatar/undraw_pic_profile.svg";
import avatarMaleDark from "../../pictures/avatar/undraw_pic_profile-dark.svg";

// icons
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbArrowBackUp } from "react-icons/tb";

// css
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const SingleBlog = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { blog } = useLoaderData();

	const { theme, user } = useSelector((state) => state.userState);
	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	const breadcrumbs = (
		<div className="text-md breadcrumbs pb-12">
			<ul>
				<li>
					<Link to="/" onClick={() => dispatch(toggleForm(false))}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/blogs" onClick={() => dispatch(toggleForm(false))}>
						Blogs
					</Link>
				</li>
			</ul>
		</div>
	);

	if (blog.length === 0 || !blog[0]) {
		return <BlogForm />;
	}

	useEffect(() => {
		if (blog === "invalid") {
			navigate("/");
		}
	}, [blog]);

	const { id, title, author, date, alt, info } = blog[0];

	const userAvatar = teamMembers.filter((member) => member.name === author);

	const avatar = userAvatar[0]?.avatar || "female";
	let avatarImg;

	// select avatar
	if (import.meta.env.VITE_SOURCE != "local") {
		if (selectedTheme === "dark" && avatar === "female") {
			import("../utils").downloadImage(
				"avatars/undraw_female_avatar-dark.svg",
				"avatar"
			);
		} else if (selectedTheme === "light" && avatar === "female") {
			import("../utils").downloadImage(
				"avatars/undraw_female_avatar.svg",
				"avatar"
			);
		} else if (selectedTheme === "dark" && avatar === "male") {
			import("../utils").downloadImage(
				"avatars/undraw_pic_profile-dark.svg",
				"avatar"
			);
		} else if (selectedTheme === "light" && avatar === "male") {
			import("../utils").downloadImage(
				"avatars/undraw_pic_profile.svg",
				"avatar"
			);
		} else {
			import("../utils").downloadImage(
				"avatars/undraw_female_avatar.svg",
				"avatar"
			);
		}
	} else {
		if (selectedTheme === "dark" && avatar === "female") {
			avatarImg = avatarFemaleDark;
		} else if (selectedTheme === "light" && avatar === "female") {
			avatarImg = avatarFemale;
		} else if (selectedTheme === "dark" && avatar === "male") {
			avatarImg = avatarMaleDark;
		} else if (selectedTheme === "light" && avatar === "male") {
			avatarImg = avatarMale;
		} else {
			avatarImg = avatarFemale;
		}
	}

	return (
		<main>
			<section className="section">
				<div className="align-element">
					{/* BREADCRUMBS */}
					{breadcrumbs}
					{/* HEADER */}
					<div className="grid justify-between grid-cols-[minmax(200px,800px)_auto] gap-4 items-center">
						{/* TITLE */}
						<SectionTitle text={title} className="pt-0 pb-0" />
						{/* BUTTONS */}
						{user && (
							<div
								className={
									user && `self-start md:h-full grid grid-cols-3 gap-2`
								}
							>
								{/* EDIT */}
								<Link
									to={`/blogs/${id}`}
									className="btn-small-primary"
									onClick={() => dispatch(toggleForm(true))}
								>
									<FaRegEdit />
								</Link>
								<Link
									to={`/blogs/${id}`}
									className="btn-normal btn-primary"
									onClick={() => dispatch(toggleForm(true))}
								>
									Edit
								</Link>

								{/* DELETE */}
								<label
									htmlFor="my_modal"
									className="btn-small-error"
									onClick={() => {
										dispatch(openModal({ type: "singleBlog", id: id }));
										dispatch(toggleForm(false));
									}}
								>
									<FaRegTrashCan />
								</label>
								<label
									htmlFor="my_modal"
									className="btn-normal btn-error"
									onClick={() => {
										dispatch(openModal({ type: "singleBlog", id: id }));
										dispatch(toggleForm(false));
									}}
								>
									Delete
								</label>

								{/* BACK TO BLOGS */}
								<Link
									to="/blogs"
									className="btn-small-accent"
									onClick={() => dispatch(toggleForm(false))}
								>
									<TbArrowBackUp />
								</Link>
								<Link
									to="/blogs"
									className="btn-normal"
									onClick={() => dispatch(toggleForm(false))}
								>
									Back
								</Link>
							</div>
						)}
					</div>

					{/* RICH TEXT EDITOR */}
					<RichTextEditor
						mainClassName=""
						wrapperClassName="py-8"
						editorClassName=""
						toolbarClassName="toolbar-class-hidden"
						readOnly={true}
						label={false}
						toolbar={toolbar}
						defaultValue={info}
						onChange={() => {}}
					/>

					{/* PHOTOS */}
					<PhotosCarousel type={id} />

					{/* AVATAR */}
					<div className="flex items-center gap-4 pt-10">
						<img id="avatar" alt={alt} className="h-12 w-12" src={avatarImg} />
						<div>
							<h3 className="font-bold text-primary text-sm">{author}</h3>
							<h5 className="text-xs">{date}</h5>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SingleBlog;
