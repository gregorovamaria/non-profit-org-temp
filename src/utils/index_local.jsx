import { blogs } from "../utils/blogsData";

export const getBlogsLocal = async ({
	params,
	page,
	lastVisible,
	direction,
}) => {
	let dataSource;
	let prepData;
	let filteredBlogs;
	let results;
	let field = "";
	let ordering = "";
	const { search, dateFrom, dateTo, order } = params;

	const blogsLocalStorage = JSON.parse(localStorage.getItem("blogsData"));

	if (blogsLocalStorage) {
		dataSource = blogsLocalStorage;
	} else {
		dataSource = blogs;
	}

	// PREPARE startDate & endDate
	let startDate = dateFrom ? new Date(`${dateFrom}`) : new Date("1900-01-01");
	let endDate = dateTo ? new Date(`${dateTo}`) : new Date();

	startDate = new Date(startDate.setHours(0, 0, 0, 0));
	endDate = new Date(endDate.setHours(23, 59, 59, 999));

	// FILTER per DATE
	prepData = dataSource.filter((blog) => {
		const blogDate = new Date(blog.date);
		return blogDate >= startDate && blogDate <= endDate;
	});

	// FILTER per SEARCH term
	if (!search || search === "") {
		filteredBlogs = prepData;
	} else if (search) {
		filteredBlogs = prepData.filter((blog) => {
			const match = blog.title.toLowerCase().includes(search.toLowerCase());
			return match;
		});
	}

	// SORT filtered results
	if (!order || order === "Latest") {
		const sortedBlogs = [...filteredBlogs].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);
		results = sortedBlogs;
	} else if (order === "Oldest") {
		const sortedBlogs = [...filteredBlogs].sort(
			(a, b) => new Date(a.date) - new Date(b.date)
		);
		results = sortedBlogs;
	} else if (order === "a-z") {
		const sortedBlogs = [...filteredBlogs].sort((a, b) =>
			a.title.localeCompare(b.title)
		);
		results = sortedBlogs;
	} else {
		const sortedBlogs = [...filteredBlogs].sort((a, b) =>
			b.title.localeCompare(a.title)
		);
		results = sortedBlogs;
	}

	// PREPARE - order by
	if (order === "a-z") {
		field = "title";
		ordering = "asc";
	}
	if (order === "z-a") {
		field = "title";
		ordering = "desc";
	}

	localStorage.setItem("filteredBlogsData", JSON.stringify(results));

	return results;
};

export const deleteBlogLocal = (id) => {
	const blogsLocalStorage = JSON.parse(localStorage.getItem("blogsData"));

	const filteredBlogs = blogsLocalStorage.filter((blog) => blog.id != id);
	localStorage.setItem("blogsData", JSON.stringify(filteredBlogs));
	return filteredBlogs;
};

export const deleteAllBlogsLocal = () => {
	const filteredBlogs = [];
	localStorage.setItem("blogsData", JSON.stringify(filteredBlogs));
	return filteredBlogs;
};

const allImages = import.meta.glob("../../pictures/blogs/*/*.svg", {
	eager: true,
	import: "default",
});

export const getImagesLocal = () => {
	let imagesByBlogID = {};

	for (const path in allImages) {
		const pathBlogId = path.split("/")[4];

		if (!imagesByBlogID[pathBlogId]) {
			imagesByBlogID[pathBlogId] = [];
		}

		imagesByBlogID[pathBlogId].push(allImages[path]);
	}

	return imagesByBlogID;
};
