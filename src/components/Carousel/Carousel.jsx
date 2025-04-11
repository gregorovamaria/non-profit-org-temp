import React from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

// images
import undraw_arrow from "../../../pictures/landingPage/undraw_arrow.svg";
import { themes } from "../../utils/data";

const Carousel = () => {
	const theme = useSelector((state) => state.userState.theme);
	const blogsDetails = useLoaderData();
	const nrOfBlogs = blogsDetails.length;
	let allBlogs = [];

	const selectedTheme = Object.entries(themes).filter(
		(item) => item[1] === theme
	)[0][0];

	const lastSlide = {
		id: "undefined",
		title: "Explore more!",
	};

	let lastSlideImg;

	if (import.meta.env.VITE_SOURCE != "local") {
		const { downloadImage } = import("../../utils");
		downloadImage("landing/undraw_arrow.svg", "imageLastSlide");
	} else {
		lastSlideImg = undraw_arrow;
	}

	allBlogs = [...blogsDetails, lastSlide];

	return (
		<div className="carousel w-full h-full">
			{allBlogs.map((blog, index) => {
				const { id: blogID, title } = blog;

				if (import.meta.env.VITE_SOURCE != "local") {
					const handleDownload = async () => {
						const { downloadImages } = await import("../../utils");
						await downloadImages(blogID, "1", index);
					};
					handleDownload();
				} else {
					if (blogID !== "undefined") {
						let allImages;
						if (selectedTheme === "dark") {
							allImages = import.meta.glob(
								"../../../pictures/blogs/*/image1.svg",
								{
									eager: true,
									import: "default",
								}
							);
						} else {
							allImages = import.meta.glob(
								"../../../pictures/blogs/*/image2.svg",
								{
									eager: true,
									import: "default",
								}
							);
						}

						let imagesByBlogID = {};

						for (const path in allImages) {
							const pathBlogId = path.split("/")[5];
							imagesByBlogID[pathBlogId] = allImages[path];
						}
						lastSlideImg = imagesByBlogID[blogID];
					} else {
						lastSlideImg = undraw_arrow;
					}
				}

				let item = {
					title,
					id: `slide${index + 1}`,
					imageId: `image${blogID === "undefined" ? "LastSlide" : index}`,
					back: `slide${index === 0 ? nrOfBlogs + 1 : index}`,
					next: `slide${index === nrOfBlogs ? 1 : index + 2}`,
					linkTo: `/blogs/${blogID !== "undefined" ? blogID : ""}`,
				};

				return (
					<div
						key={item.id}
						id={item.id}
						className="carousel-item relative w-full max-full justify-center"
					>
						<div className="flex justify-between items-center">
							{nrOfBlogs > 0 && (
								<button
									onClick={(e) => {
										e.preventDefault();
										document.getElementById(item.back)?.scrollIntoView({
											behavior: "smooth",
											block: "nearest",
										});
									}}
									className="btn btn-circle mr-12 absolute left-0"
								>
									❮
								</button>
							)}
							<Link to={item.linkTo} className="w-full">
								<div className="">
									<h5 className="text-center text-primary font-bold pb-8">
										{item.title}
									</h5>
									<img
										id={item.imageId}
										className="w-full h-auto max-h-32 md:max-h-40"
										src={lastSlideImg}
									/>
								</div>
							</Link>
							{nrOfBlogs > 0 && (
								<button
									onClick={(e) => {
										e.preventDefault();
										document.getElementById(item.next)?.scrollIntoView({
											behavior: "smooth",
											block: "nearest",
										});
									}}
									className="btn btn-circle ml-12 absolute right-0"
								>
									❯
								</button>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Carousel;
