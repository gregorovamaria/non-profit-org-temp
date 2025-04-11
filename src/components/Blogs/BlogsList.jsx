import React from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";

// components
import { EditDeleteBtn } from "../../components";
import { getImagesLocal } from "../../utils/index_local";

const BlogsList = () => {
	const { blogsDetails } = useLoaderData();
	const { user } = useSelector((store) => store.userState);
	let source = null;

	return (
		<article className="mt-12 grid gap-y-8">
			{blogsDetails.results.map((blog, index) => {
				const { id, alt, title, info, author, date } = blog;

				if (import.meta.env.VITE_SOURCE != "local") {
					import("../../utils").downloadImages(id, "1", index);
				} else {
					const imagesByBlogID = getImagesLocal();
					source = imagesByBlogID[id][0];
				}

				const formattedInfo = `${
					info.blocks[0].text.length <= 100
						? info.blocks[0].text
						: info.blocks[0].text.slice(0, 100) + "..."
				}`;

				return (
					<div key={id} className="relative">
						{/* EDIT & DELETE BUTTONS */}
						{user && <EditDeleteBtn id={id} />}

						{/* REDIRECT TO SINGLE BLOG */}
						<Link
							to={`/blogs/${id}`}
							key={id}
							className="p-8 rounded-lg grid sm:grid-cols-[5rem_auto] gap-4 bg-base-100 shadow-md hover:shadow-xl duration-300 group"
						>
							<img
								id={`image${index}`}
								alt={alt}
								className="h-16 w-16 rounded-lg sm:h-20 sm:w-20 object-cover group-hover:scale-105 transition duration-300"
								src={source ? source : `image${index}`}
							/>
							<div>
								<div className="ml-0 sm:ml-16">
									<h4 className="text-primary font-bold capitalize">{title}</h4>
									<p className="pt-2 text-sm">{formattedInfo}</p>
								</div>
								<div className="pt-2 ml-0 sm:ml-auto text-left sm:text-right text-xs">
									<p className="font-bold">{author}</p>
									<p>{date}</p>
								</div>
							</div>
						</Link>
					</div>
				);
			})}
		</article>
	);
};

export default BlogsList;
